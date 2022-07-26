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

export const firebaseConfig = {
    apiKey: "AIzaSyBZQuli2PeqT9DmroKDuMU5HCakqVIBJQA",
    authDomain: "nextjs-blog-88fc5.firebaseapp.com",
    projectId: "nextjs-blog-88fc5",
    storageBucket: "nextjs-blog-88fc5.appspot.com",
    messagingSenderId: "5457401414",
    appId: "1:5457401414:web:4d24bc88a2062400cf1c47"
}

interface IAuthors {
    [author: string]: {
        name: string
    }
}
export const authors: IAuthors = {
    'matt': {
        name: 'Matt Smith',
    }
}