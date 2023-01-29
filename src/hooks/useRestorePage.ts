import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Json } from "../schema"
import { supabase } from "../supabase"

async function restorePage(id: string) {
    const { data, error } = await supabase
        .from("pages")
        .update({ archived: false, parent_id: null })
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

export function useRestorePage({ id }: { id: string }) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => restorePage(id),
        onSuccess: (newPage) => {
            queryClient.setQueryData(["pages", id], newPage)
            queryClient.refetchQueries(["pages"])
            queryClient.refetchQueries(["archived_pages"])
        },
    })
}
