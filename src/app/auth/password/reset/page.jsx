"use client"
import ResetPasswordEmailForm from '@/components/resetPasswordForm'

export default function ResetPassword() {
    return (
        <div className="card">
            <h3>Password Reset</h3>
            <p>Enter your email below to receive a link to reset your password</p>
            <ResetPasswordEmailForm></ResetPasswordEmailForm>
        </div>
    )
}