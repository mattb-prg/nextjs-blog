import { AppProps } from 'next/app'
import { FC } from 'react'
import '../styles/global.css'

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        <Component {...pageProps}></Component>

    )
}
export default App