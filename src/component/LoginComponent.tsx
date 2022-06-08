import {useAppDispatch, useAppSelector} from '../midleware/hooks';
import React, {ReactElement, useEffect} from 'react';
import {setJwtToken} from '../midleware/authenticationSlice';
import {useSearchParams} from 'react-router-dom';
import MicrosoftAuthenticationService from '../services/AuthenticationService';

const LoginComponent: React.FC = (): ReactElement => {
    const jwtToken = useAppSelector((state) => state.authentication.jwtToken)
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    const startMicrosoftAuthentication = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()

        if (!jwtToken) {
            const redirect = await MicrosoftAuthenticationService.startAuthentication()
            if (redirect?.redirectURI) { window.location.href = redirect.redirectURI }
        }
    }

    const finishMicrosoftAuthentication = async (code: string) => {
        const jwtToken = await MicrosoftAuthenticationService.finishAuthentication(code)
        return await dispatch(setJwtToken(jwtToken.token))
    }

    useEffect(() => {
        const checkMicrosoftResponse = async () => {
            const code = searchParams.get("code")
            if (code!) { await finishMicrosoftAuthentication(code) }
        }

        if (!jwtToken) { checkMicrosoftResponse().catch(console.log) }
    }, [])

    return (<React.Fragment>
        <div>
            { !jwtToken && <button onClick={startMicrosoftAuthentication}>Microsoft UPCE account</button> }
        </div>
    </React.Fragment>)
}

export default LoginComponent
