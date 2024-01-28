import { createClient } from '@supabase/supabase-js'
import { type Database, type Tables } from './types/database.types'

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export type Page = Tables<'pages'>
export type PageItem = Pick<Page, 'id' | 'title' | 'parent_id'>
export type PageWithSubpages = Page & { subpages: PageItem[] }

export type Profile = Tables<'profiles'>
