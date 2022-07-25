export interface ICategory {
    id: string
    name: string
    href: string
}
export const categories: ICategory[] = [
    {
        id: 'writing',
        name: 'Writing',
        href: '/categories/writing'
    },
    {
        id: 'sports',
        name: 'Sports',
        href: '/categories/sports'
    },
    {
        id: 'crafts',
        name: 'Crafts',
        href: '/categories/crafts'
    },
]