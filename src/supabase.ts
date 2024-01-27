import { createClient } from '@supabase/supabase-js'
import { Database, Tables } from './types/database.types'

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export type Page = Tables<'pages'>
export type PageTitle = Pick<Page, 'id' | 'title'>
export type Profile = Tables<'profiles'>
