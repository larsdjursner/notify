import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Json } from '../../types/database.types'
import { supabase } from '../../supabase'
import { pageKeys } from './page-keys'

async function updateContent(id: string, content: Json) {
    const { data, error } = await supabase
        .from('pages')
        .update({ content })
        .eq('id', id)
        .select()
        .single()

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Page could not be updated')
    }

    return data
}

export function useUpdatePageContent(id: string) {
    const queryClient = useQueryClient()
    const queryKey = pageKeys.details(id)

    return useMutation({
        mutationFn: async (content: Json) => await updateContent(id, content),
        onSuccess: (newPage) => {
            queryClient.setQueryData(queryKey, newPage)
        },
    })
}
