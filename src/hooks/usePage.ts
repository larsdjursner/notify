import { QueryKey, useQuery } from "@tanstack/react-query"
import { Page, supabase } from "../supabase"

const fetchPage = async (id: string | undefined) => {
    const { data, error } = await supabase
        .from("pages")
        .select()
        .eq("id", id)
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data || data === undefined) {
        throw new Error("No page found")
    }

    return data
}

export default function usePage(id: string | undefined) {
    const key: QueryKey = ["pages", id]
    return useQuery<Page, Error>({
        queryKey: key,
        queryFn: () => fetchPage(id),
    })
}
