"use client"

import type React from "react"

import { createContext } from "react"

export const AuthContext = createContext(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}
