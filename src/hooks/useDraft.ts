import { useCallback } from 'react'

const DRAFTS_KEY = 'yahavi-forge-drafts'

function loadAllDrafts(): Record<string, Record<string, string>> {
  try {
    return JSON.parse(localStorage.getItem(DRAFTS_KEY) || '{}') as Record<string, Record<string, string>>
  } catch {
    return {}
  }
}

export function useDraft(toolId: string) {
  const loadDraft = useCallback((): Record<string, string> => {
    const all = loadAllDrafts()
    return all[toolId] ?? {}
  }, [toolId])

  const saveDraft = useCallback((inputs: Record<string, string>) => {
    try {
      const all = loadAllDrafts()
      all[toolId] = inputs
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(all))
    } catch {}
  }, [toolId])

  const clearDraft = useCallback(() => {
    try {
      const all = loadAllDrafts()
      delete all[toolId]
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(all))
    } catch {}
  }, [toolId])

  return { loadDraft, saveDraft, clearDraft }
}
