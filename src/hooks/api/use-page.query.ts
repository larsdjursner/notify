import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import { pageKeys } from './page-keys'

export default function usePage(id: string) {
    return useQuery({
        queryKey: pageKeys.details(id),
        queryFn: async () => {
            const { data, error } = await supabase.from('pages').select().eq('id', id).single()

            if (error != null) {
                throw new Error(error.message)
            }

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!data) {
                throw new Error('No page found')
            }

            return data
        },
        gcTime: 0,
        refetchOnMount: true,
    })
}
