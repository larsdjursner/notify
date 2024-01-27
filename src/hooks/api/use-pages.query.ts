import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import { pageKeys } from './page-keys'

const fetchPages = async () => {
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('archived', false)
        .is('parent_id', null)

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('No pages found')
    }

    return data
}

export default function usePages() {
    return useQuery({
        queryKey: pageKeys.list(),
        queryFn: async () => await fetchPages(),
    })
}
