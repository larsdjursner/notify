import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../supabase'
import { pageKeys } from './page-keys'

export type UsePageParams = {
    id: string
}

const getPage = async ({ id }: UsePageParams) => {
    const { data, error } = await supabase.from('pages').select().eq('id', id).single()

    if (error != null) {
        throw new Error(error.message)
    }

    if (!data) {
        throw new Error('No page found')
    }

    return data
}

export default function usePage(id: string) {
    return useQuery({
        queryKey: pageKeys.details(id),
        queryFn: async () => {
            return await getPage({ id })
        },
    })
}
