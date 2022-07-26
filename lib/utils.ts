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