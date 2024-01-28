import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../stores/authStore'
import { type Page, supabase } from '../../supabase'

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
        throw new Error('Page could not be Created')
    }

    return data
}

export function useCreatePage({ parent_id }: UseCreatePageParams = {}) {
    const user_id = useAuthStore.getState().user?.id

    if (!user_id) return

    return useMutation<Page, Error>({
        mutationFn: async () => {
            return await createPage(user_id, parent_id ?? null)
        },
    })
}
