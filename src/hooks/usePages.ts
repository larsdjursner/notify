import { useQuery } from "@tanstack/react-query"
import { Page, supabase } from "../supabase"

const fetchPages = async () => {
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .is("parent_id", null)

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error("No pages found")
    }

    return data
}

export default function usePages() {
    return useQuery<Page[], Error>({
        queryKey: ["pages"],
        queryFn: fetchPages,
    })
}
