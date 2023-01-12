import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export async function fetchPages() {
    const { data } = await supabase.from("pages").select("id, title")
    return data
}
