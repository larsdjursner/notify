// import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"
// import { Json } from "../schema"
// import { Page, supabase } from "../supabase"

// async function updatePage({ page }: { page: Page }) {
//     const { id, title, content } = page
//     const { data, error } = await supabase
//         .from("pages")
//         .update({ title, content })
//         .eq("id", id)
//         .select()
//         .single()

//     if (error) {
//         throw new Error(error.message)
//     }

//     if (!data) {
//         throw new Error("Page could not be updated")
//     }

//     return data
// }

// export function useUpdatePage({ page }: { page: Page }) {
//     const queryClient = useQueryClient()

//     return useMutation<Page, Error>({
//         mutationFn: () => updatePage({ page }),
//         onSuccess: (newPage) => {
//             queryClient.setQueryData(["pages", page.id], newPage)
//         },
//         // onMutate: async ({ page }: { page: Page }) => {
//         //     // Cancel any outgoing refetches
//         //     // (so they don't overwrite our optimistic update)
//         //     await queryClient.cancelQueries({ queryKey: ["pages", page.id] })

//         //     // Snapshot the previous value
//         //     const prevPage = queryClient.getQueryData(["pages", page.id])

//         //     // Optimistically update to the new value
//         //     queryClient.setQueryData(["pages", page.id], page)

//         //     // Return a context with the previous and new todo
//         //     return { prevPage, page }
//         // },
//         // // If the mutation fails, use the context we returned above
//         // onError: (err, _, context) => {
//         //     if (!context) return
//         //     queryClient.setQueryData(
//         //         ["pages", context.page.id],
//         //         context.prevPage
//         //     )
//         // },
//         // // Always refetch after error or success:
//         // onSettled: (page) => {
//         //     if (!page) return
//         //     queryClient.invalidateQueries({ queryKey: ["pages", page.id] })
//         // },
//     })
// }
