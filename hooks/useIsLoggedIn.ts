import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        console.log('client only')
        const unsub = onAuthStateChanged(getAuth(), (auth) => {
            if (auth) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    return isLoggedIn
}