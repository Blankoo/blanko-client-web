import React from 'react'
import { connect } from 'react-redux'
import { sendResetPassword } from '../../actions'
import useInput from '../../components/Input'
import Button from '../../components/Button'

function Reset(props) {
    const { token } = props.match.params
    const [passwordValue, passwordField] = useInput({ label: 'New password'})
    const [makeSure, makeSureField] = useInput({ label: 'Verify password' })

    function verify() {
        if(passwordValue === makeSure) {
            return props.sendResetPassword(token, passwordValue)
        }

        console.log('Not the same...')
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
        </div>
    )
}

export default connect(undefined, { sendResetPassword })(Reset)
