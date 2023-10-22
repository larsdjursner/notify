import { useQuery } from '@tanstack/react-query'
import { type Page, supabase } from '../../supabase'

const fetchArchivedPages = async (query: string) => {
    const formatted = `%${query}%`
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('archived', true)
        .like('title', formatted)

    if (error != null) {
        throw new Error(error.message)
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!data) {
        throw new Error('No deleted pages found')
    }

    return data
}

export default function useFetchArchivedPages(query: string) {
    return useQuery<Page[], Error>({
        queryKey: ['pages', query],
        queryFn: async () => await fetchArchivedPages(query),
    })
}
