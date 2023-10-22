import { useMutation } from '@tanstack/react-query'
import { type Page, supabase } from '../../supabase'

export async function deletePage(id: string, softDelete: boolean) {
    const { data, error } = softDelete
        ? await supabase.from('pages').update({ archived: true }).eq('id', id).select().single()
        : await supabase.from('pages').delete().eq('id', id).select().single()

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Page could not be deleted')
    }

    return data
}

type Props = {
    id: string
    softDelete?: boolean
    parent_id?: null | string
}

export function useDeletePage({ id, softDelete = true, parent_id = null }: Props) {
    // const queryClient = useQueryClient()

    return useMutation<Page, Error>({
        mutationFn: async () => {
            return await deletePage(id, softDelete)
        },
        onSuccess: () => {
            // const key = parent_id ? [`pages-${parent_id}`] : ['pages']
            // queryClient.refetchQueries(key)
            // queryClient.refetchQueries(["archived_pages"])
        },
    })
}
