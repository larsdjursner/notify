import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Json } from '../../types/schema'
import { type Page, supabase } from '../../supabase'

async function updateTitle(id: string, title: string) {
    const { data, error } = await supabase
        .from('pages')
        .update({ title })
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

export function useUpdatetitle(id: string, parent_id?: string | null) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (title: string) => await updateTitle(id, title),
        onSuccess: (newPage) => {
            queryClient.setQueryData(['pages', id], newPage)
            let queryKey = ['pages']
            if (parent_id) {
                queryKey = [`pages-${parent_id}`]
            }

            queryClient.setQueryData<Page[]>(queryKey, (old) => {
                if (old === undefined) return []
                return old.map((page) => (page.id === newPage.id ? newPage : page))
            })
        },
    })
}
