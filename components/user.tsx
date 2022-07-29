import { faSignIn, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FC, useState } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
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
                    <span aria-label="Sign in" data-microtip-position="bottom-left" role="tooltip" onClick={onSignIn}>
                        <Icon icon={faSignIn} />
                    </span>
                )
            }
            {
                isLoggedIn && !isChangingAuth && (
                    <span aria-label="Sign out" data-microtip-position="bottom-left" role="tooltip" onClick={onSignOut}>
                        <Icon icon={faUser} />
                    </span>
                )
            }
        </span>
    )
}