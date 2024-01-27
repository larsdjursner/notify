import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Page, supabase } from '../../supabase'
import { pageKeys } from './page-keys'
import { produce } from 'immer'

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

export function useUpdatetitle(id: string) {
    const queryClient = useQueryClient()
    const queryKey = pageKeys.details(id)

    return useMutation({
        mutationFn: async (title: string) => {
            return await updateTitle(id, title)
        },

        onMutate: async (title: string) => {
            await queryClient.cancelQueries({ queryKey })

            const previousPage = queryClient.getQueryData<Page>(queryKey)

            if (!previousPage) {
                return
            }

            queryClient.setQueryData<Page>(queryKey, (old) => {
                if (!old) {
                    return old
                }

                return produce(old, (draft) => {
                    draft.title = title
                })
            })

            return { previousPage }
        },

        onError: (_err, _variables, context) => {
            if (context?.previousPage) {
                queryClient.setQueryData<Page>(queryKey, context.previousPage)
            }
        },

        onSettled: async (data, _error, _variables, _context) => {
            if (!data) {
                return
            }

            await queryClient.invalidateQueries({ queryKey })

            const { parent_id } = data

            if (parent_id) {
                const parentQueryKey = pageKeys.details(parent_id)
                await queryClient.invalidateQueries({ queryKey: parentQueryKey })
            }
        },
    })
}
