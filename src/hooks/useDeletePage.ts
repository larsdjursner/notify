import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Page, supabase } from "../supabase"

export async function deletePage(id: string) {
    const { data, error } = await supabase
        .from("pages")
        .delete()
        .eq("id", id)
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error("Page could not be deleted")
    }

    return data
}

export function useDeletePage(id: string, parent_id: null | string = null) {
    const queryClient = useQueryClient()

    return useMutation<Page, Error>({
        mutationFn: () => {
            return deletePage(id)
        },
        onSuccess: () => {
            const key = parent_id ? [`pages-${parent_id}`] : ["pages"]
            queryClient.refetchQueries(key)
        },
    })
}
