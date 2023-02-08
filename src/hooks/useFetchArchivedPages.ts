import { QueryKey, useQuery } from '@tanstack/react-query'
import { ArchivedPage, Page, supabase } from '../supabase'

const fetchArchivedPages = async (query: string) => {
    const formatted = `%${query}%`
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('archived', true)
        .like('title', formatted)

    if (error) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('No deleted pages found')
    }

    return data
}

export default function useFetchArchivedPages(query: string) {
    return useQuery<Page[], Error>({
        queryKey: ['pages', query],
        queryFn: () => fetchArchivedPages(query),
    })
}
