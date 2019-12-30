import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendResetPassword } from '../../actions'
import useInput from '../../components/Input'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

function Reset(props) {
    const { token } = props.match.params
    const [isLoading, setIsLoading] = useState(false)
    const [passwordValue, passwordField] = useInput({ label: 'New password', type: 'password' })
    const [makeSure, makeSureField] = useInput({ label: 'Verify password', type: 'password' })

    function verify() {
        if(passwordValue === makeSure) {
            setIsLoading(true)
            props.sendResetPassword(token, passwordValue)
                .then((result) => {
                    if(result.success) {
                        setIsLoading(false)
                    }
                })
        }
    }

    return (
        <div>
            <h1>Reset password</h1>
            {passwordField}
            {makeSureField}

            <Button
                onClick={verify}
                text="Reset"
            />

            { isLoading && <Loading />}
        </div>
    )
}

export default connect(undefined, { sendResetPassword })(Reset)
