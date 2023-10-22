import { type QueryKey, useQuery } from '@tanstack/react-query'
import { type Page, supabase } from '../../supabase'

const fetchPage = async (id: string | undefined) => {
    if (id == null) {
        throw new Error('No page id')
    }

    const { data, error } = await supabase.from('pages').select().eq('id', id).single()

    if (error != null) {
        throw new Error(error.message)
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!data) {
        throw new Error('No page found')
    }

    return data
}

export default function usePage(id: string | undefined) {
    const key: QueryKey = ['pages', id]
    return useQuery<Page, Error>({
        queryKey: key,
        queryFn: async () => await fetchPage(id),
        gcTime: 0,
        refetchOnMount: true,
    })
}
