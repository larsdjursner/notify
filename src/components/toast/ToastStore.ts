import create from 'zustand'

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
    addToast: (toast) => set((state) => ({ toastList: [...state.toastList, toast] })),
    removeToast: (id) => {
        set((state) => ({
            toastList: state.toastList.filter((toast) => toast.id !== id),
        }))
    },
    resetToasts: () => set({ toastList: [] }),
}))

export default useToastStore

export const addDeleteToast = ({
    id,
    undo,
    delay = 5000,
    text = 'Moved to trash',
}: DeleteToast) => {
    const toast: DeleteToast = {
        id,
        delay,
        text,
        undo,
    }

    useToastStore.setState((state) => ({
        toastList: [...state.toastList, toast],
    }))
}
