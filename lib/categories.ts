import { categories } from "../config"
import { getAllPostsFrontMatter } from "./posts"

export const getCategoryPaths = () => {
    return getCategories()
        .map((val) => ({
            params: {
                id: val.id
            }
        }))
}

export const getCategories = () => {
    return categories.slice()
}

export const getCategoryPosts = (id: string) => {
    return getAllPostsFrontMatter().filter((post) => post.category === id)
}