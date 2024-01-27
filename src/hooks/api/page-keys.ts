export const pageKeys = {
    all: ['pages'] as const,
    list: () => [...pageKeys.all, 'list'] as const,
    details: (id: string) => [pageKeys.all, id] as const,
}
