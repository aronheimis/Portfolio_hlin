import { createClient } from '@sanity/client'

// Falls back to a placeholder so the app renders (with empty data) before
// env vars are configured. Real API calls will simply return nothing.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})
