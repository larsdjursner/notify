import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Json } from "../schema"
import { supabase } from "../supabase"

async function updateTitle(id: string, title: string) {
    const { data, error } = await supabase
        .from("pages")
        .update({ title })
        .eq("id", id)
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error("Page could not be updated")
    }

    return data
}

export function useUpdatetitle(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (title: string) => updateTitle(id, title),
        onSuccess: (newPage) => {
            queryClient.setQueryData(["pages", id], newPage)
        },
    })
}
