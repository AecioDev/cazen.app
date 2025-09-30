"use client"

import type React from "react"

import { createContext } from "react"

export const WeddingContext = createContext(null)

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  return <WeddingContext.Provider value={null}>{children}</WeddingContext.Provider>
}
