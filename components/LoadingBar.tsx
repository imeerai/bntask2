"use client"

import { useLoading } from "@/contexts/LoadingContext"

export function LoadingBar() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return <div className="loading-bar" />
}
