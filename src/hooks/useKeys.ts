import { useState, useCallback } from 'react'

const KEYS_STORAGE_KEY = 'yahavi-forge-keys'

export interface ProviderKeys {
  groq?: string
  gemini?: string
  openrouter?: string
  together?: string
  mistral?: string
  cohere?: string
}

function loadKeys(): ProviderKeys {
  try {
    return JSON.parse(localStorage.getItem(KEYS_STORAGE_KEY) || '{}') as ProviderKeys
  } catch {
    return {}
  }
}

function saveKeys(keys: ProviderKeys): void {
  try {
    localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys))
  } catch {}
}

export function useKeys() {
  const [keys, setKeysState] = useState<ProviderKeys>(loadKeys)

  const setKey = useCallback((provider: keyof ProviderKeys, value: string) => {
    setKeysState((prev) => {
      const next = { ...prev, [provider]: value.trim() || undefined }
      if (!value.trim()) delete next[provider]
      saveKeys(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    localStorage.removeItem(KEYS_STORAGE_KEY)
    setKeysState({})
  }, [])

  const activeCount = Object.values(keys).filter((v) => v && v.trim().length > 0).length

  const hasAnyKey = activeCount > 0

  return { keys, setKey, clearAll, activeCount, hasAnyKey }
}
