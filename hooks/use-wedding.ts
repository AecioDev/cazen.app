"use client"

import { useContext } from "react"
import { WeddingContext } from "@/components/providers/wedding-provider"

export function useWedding() {
  const context = useContext(WeddingContext)
  if (!context) {
    throw new Error("useWedding must be used within WeddingProvider")
  }
  return context
}
