import { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import '../styles/global.css'
import 'tippy.js/dist/tippy.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

if (typeof window !== 'undefined') {
    initializeApp(firebaseConfig)
}

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
    return (
        <Component {...pageProps}></Component>

    )
}
export default App