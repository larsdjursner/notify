import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Json } from '../schema'
import { supabase } from '../supabase'

async function updateContent(id: string, content: Json) {
    const { data, error } = await supabase
        .from('pages')
        .update({ content })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Page could not be updated')
    }

    return data
}

export function useUpdateContent(id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (content: Json) => updateContent(id, content),
        onSuccess: (newPage) => {
            queryClient.setQueryData(['pages', id], newPage)
        },
    })
}
