import ResetPasswordEmailForm from '@/components/resetPasswordForm'
import UpdatePasswordForm from '@/components/updatePasswordForm'
import { isResetTokenValid } from '@/services/AuthService'

export default async function UpdatePassword(props) {
    const resetToken = props.params.token

    const checkTokenValid = async () => {
        const isValid = await isResetTokenValid(resetToken)
        return isValid
    }
    const isTokenValid = await checkTokenValid()
    
    if (isTokenValid) {
        return (
            <div className="card">
                Reset Password Form
                <UpdatePasswordForm token={resetToken}></UpdatePasswordForm>
            </div>
        )
    } else {
        return (
            <div className="card">
                <p>Your password reset token has expired. Please enter your email address to receive a new one.</p>
                <ResetPasswordEmailForm></ResetPasswordEmailForm>
            </div>
        )
    }
}