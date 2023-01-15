import { createClient } from "@supabase/supabase-js"
import { Database } from "./schema"

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export async function fetchPages() {
    const { data } = await supabase.from("pages").select("id, title")
    return data
}

export async function fetchPageById(id: string) {
    const { data } = await supabase.from("pages").select().eq("id", id)
    return data
}
