import { faSignIn, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FC, useState } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import Tippy from '@tippyjs/react';
import { Icon } from "./icon";

export const User: FC<{}> = (props) => {
    const isLoggedIn = useIsLoggedIn()
    const [isChangingAuth, setIsChangingAuth] = useState(false)
    const onSignIn = async () => {
        const main = async () => {
            setIsChangingAuth(true)
            try {
                await signInWithPopup(getAuth(), new GoogleAuthProvider())
            } catch (err) {

            }
            setIsChangingAuth(false)
        }
        main()
    }
    const onSignOut = async () => {
        const main = async () => {
            setIsChangingAuth(false)
            try {
                await signOut(getAuth())
            } catch (err) {

            }
            setIsChangingAuth(false)
        }
        main()
    }
    return (
        <span className="w-4 cursor-pointer outline-none">
            {
                (isChangingAuth || isLoggedIn === undefined) && (
                    <Icon className="animate-spin" icon={faSpinner} />
                )
            }
            {
                isLoggedIn === false && !isChangingAuth && (
                    <Tippy content={<span>Sign in</span>}>
                        <span onClick={onSignIn}>
                            <Icon icon={faSignIn} />
                        </span>
                    </Tippy>
                )
            }
            {
                isLoggedIn && !isChangingAuth && (
                    <Tippy content={<span>Sign out</span>}>
                        <span onClick={onSignOut}>
                            <Icon icon={faUser} />
                        </span>
                    </Tippy>
                )
            }
        </span>
    )
}