import { createClient } from "@supabase/supabase-js"
import { Database, Json } from "./schema"

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export type Page = Database["public"]["Tables"]["pages"]["Row"]
export type PageTitle = Pick<Page, "id" | "title">

export async function fetchPages() {
    const { data } = await supabase.from("pages").select("id, title")
    return data
}

export async function fetchPageById(id: string) {
    const { data } = await supabase.from("pages").select().eq("id", id)
    return data
}

export async function updateTitleById(id: string, title: string) {
    supabase.from("pages").update({ title }).eq("id", id).select()
}

export async function updateContentById(id: string, content: Json) {
    return supabase.from("pages").update({ content }).eq("id", id).select()
}
