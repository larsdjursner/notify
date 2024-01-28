import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../stores/authStore'
import { supabase } from '../../supabase'
import { pageKeys } from './page-keys'

export type UseCreatePageParams = {
    parent_id?: string | null
}

export const createPage = async (user_id: string, parent_id: string | null) => {
    const { data, error } = await supabase
        .from('pages')
        .insert({ user_id, parent_id }, { count: 'exact' })
        .select()
        .single()

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('Page could not be created')
    }

    return data
}

export function useCreatePage({ parent_id }: UseCreatePageParams = {}) {
    const user_id = useAuthStore.getState().user?.id
    const queryClient = useQueryClient()
    if (!user_id) return

    return useMutation({
        mutationFn: async () => {
            return await createPage(user_id, parent_id ?? null)
        },
        onSuccess: async (_newPage) => {
            await queryClient.refetchQueries({ queryKey: pageKeys.all })
        },
    })
}
