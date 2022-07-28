import { postsPerPage } from "../config";
import { getAllPostsFrontMatter } from "./posts";

export function getPagesPaths() {
    const totalPages = Math.ceil(getAllPostsFrontMatter().length / postsPerPage)
    return Array(totalPages).fill(undefined).map((_, i) => ({
        params: {
            id: `${i + 1}`
        }
    }))
}
