import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../stores/authStore'
import { type Page, supabase } from '../../supabase'

export type UseAddPageParams = {
    parent_id?: null | string
}

export const addPage = async (user_id: string, parent_id: null | string = null) => {
    const { data, error } = await supabase
        .from('pages')
        .insert({ user_id, parent_id }, { count: 'exact' })
        .select()
        .single()

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Page could not be added')
    }

    return data
}

export function useAddPage(parent_id: null | string = null) {
    const userid = useAuthStore.getState().user?.id
    if (!userid) return

    const queryClient = useQueryClient()

    return useMutation<Page, Error>({
        mutationFn: async () => {
            return await addPage(userid, parent_id)
        },
        onSuccess: () => {
            const key: QueryKey = parent_id ? [`pages-${parent_id}`] : ['pages']
            queryClient.refetchQueries(key)
        },
    })
}
