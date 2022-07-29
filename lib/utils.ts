import { title } from "../config"

// https://gist.github.com/AoiYamada/f7a22f637ce9be57efc30b1f7aead45c
export function extractContents(html: string) {
    return html
        .replace(/(\n|\r|\t)/gm, '') // remove linebreaks
        .replace(/<(style|script|link|noscript).*?>.*?<\/(style|script|link|noscript)>/g, '') // remove css, js blocks
        .replace(/<!--.*?-->/g, '') // remove comments
        .replace(/<.*?>/g, '') // remove tags
        .replace(/[\s\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\:\"\;\'\<\>\?\,\.\/\|\\\`\~]+/g, ' ') // remove symbols
}

export function wordCount(content: string) {
    return content.split(' ').length
}

/**
 * Calls fn after timeout ms. If called again before timeout ms cancels previous timeout.
 * @param fn 
 * @param timeout 
 * @returns 
 */
export function latestTimeout(fn: () => void, timeout: number) {
    let int: number
    return () => {
        window.clearTimeout(int)
        int = window.setTimeout(fn, timeout)
    }
}

export function createTitle(content: string) {
    return `${title} - ${content}`
}
