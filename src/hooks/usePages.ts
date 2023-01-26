import { QueryKey, useQuery } from "@tanstack/react-query"
import { Page, supabase } from "../supabase"

const fetchPages = async (parent_id: string | null = null) => {
    const { data, error } = parent_id
        ? await supabase.from("pages").select("*").eq("parent_id", parent_id)
        : await supabase.from("pages").select("*").is("parent_id", null)

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error("No pages found")
    }

    return data
}

export default function usePages(parent_id: string | null = null) {
    const key: QueryKey = parent_id ? [`pages-${parent_id}`] : ["pages"]
    return useQuery<Page[], Error>({
        queryKey: key,
        queryFn: () => fetchPages(parent_id),
    })
}
