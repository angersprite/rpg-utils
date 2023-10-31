import { validateEmailToken } from '@/app/api/auth/authService'

export default async function EmailConfirmation(props) {
    const confirmationToken = props.params.token
    const validated = await validateEmailToken(confirmationToken)
    if (validated) {
        const message = 'Your email address has been confirmed. Please log in to proceed.'
    } else {
        const message = 'Unable to validate token'
    }

    return (
        <div className="card">
            {message}
        </div>
    )
}

