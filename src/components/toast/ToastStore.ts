import create from "zustand"

export interface DeleteToast {
    id: string
    delay: number
    text: string
    undo: () => void
}

type State = {
    toastList: DeleteToast[]
    addToast: (toast: DeleteToast) => void
    removeToast: (id: string) => void
    resetToasts: () => void
}

const useToastStore = create<State>((set) => ({
    toastList: [],
    addToast: (toast) =>
        set((state) => ({ toastList: [...state.toastList, toast] })),
    removeToast: (id) => {
        console.log("removing toast", id)
        set((state) => ({
            toastList: state.toastList.filter((toast) => toast.id !== id),
        }))
    },
    resetToasts: () => set({ toastList: [] }),
}))

export default useToastStore

export const addDeleteToast = (id: string) => {
    const toast: DeleteToast = {
        id: id,
        delay: 5000,
        text: "Moved to trash",
        undo: () => {
            console.log("undo", id)
        },
    }

    console.log("adding", toast)
    useToastStore.setState((state) => ({
        toastList: [...state.toastList, toast],
    }))
}
