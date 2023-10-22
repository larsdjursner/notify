export const pageKeys = {
    all: ['pages'] as const,
    details: (id: string) => ['pages', id] as const,
}
