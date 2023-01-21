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
    return supabase.from("pages").update({ title }).eq("id", id).select()
}

export async function updateContentById(id: string, content: Json) {
    return supabase.from("pages").update({ content }).eq("id", id).select()
}

export async function addPage(user_id: string) {
    return supabase
        .from("pages")
        .insert({ user_id }, { count: "exact" })
        .select()
}

export async function deleteById(id: string) {
    return supabase.from("pages").delete().eq("id", id).select()
}

export async function fetchDeletedPages() {
    const { data } = await supabase.from("deleted_pages").select("id, title")
    return data
}

export async function fetchDeletedPageById(id: string) {
    const { data } = await supabase.from("deleted_pages").select().eq("id", id)
    return data
}

export async function deletePermanentlyById(id: string) {
    return supabase.from("deleted_pages").delete().eq("id", id).select()
}

export async function restorePage(id: string) {
    fetchDeletedPageById(id).then((res) => {
        if (!res) return

        deletePermanentlyById(id)
        const page = res[0]
        return supabase.from("pages").insert(page).select()
    })
}
