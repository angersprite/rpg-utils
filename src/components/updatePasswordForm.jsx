"use client"
import { useState}  from 'react'
import UserService from '@/services/UserService'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordForm(props) {
    const router = useRouter()
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [passwordMessages, setPasswordMessages] = useState([])
    let [confirmPWMessage, setConfirmPWMessage] = useState([])

    const pwPolicies = [
        { 
            policy: (pw) => { return pw.length >= 8 && pw.length <= 50 }, 
            helperText: 'Passwords must be between 8 and 50 characters long' 
        },
        {
            policy: (pw) => { return pw.match(/[0-9]/) },
            helperText: 'Passwords must contain a number'
        },
        {
            policy: (pw) => { return pw.match(/[A-z]/) },
            helperText: 'Passwords must contain a letter'
        }
    ]
    const isPasswordValid = () => {
        setPasswordMessages([])
        let pwMessages = []
        let isValid = true
        pwPolicies.forEach(pol => {
            if (!pol.policy(password)) {
                pwMessages.push(pol.helperText)
                isValid = false
            }
        })
        setPasswordMessages(pwMessages)
        return isValid
    }
    const isPasswordConfirmed = () => {
        if (password == confirmPassword) {
            setConfirmPWMessage('')
            return true
        } else {
            setConfirmPWMessage('Passwords do not match')
            return false
        }
    }
    const updatePassword = async () => {
        let pwCheck = isPasswordValid()
        let pwConfirmCheck = isPasswordConfirmed()
        
        if (pwCheck && pwConfirmCheck) {
            const postBody = JSON.stringify({
                token: props.token,
                password: password
            })
            const res = await fetch('/api/auth/password/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: postBody})
                .then(res => { return res.json() })
            console.log(res)
            
            if (res) {
                router.push('/auth/password/updated')
            } else {

            }
        }
    }
    
    return (
        <form>
            <div className="vert-label-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required onChange={e => { setPassword(e.target.value) }}></input>
                <ul className="input-helper-text">
                    {passwordMessages.map((m,i) => { return (<li key={i}>{m}</li>) })}
                </ul>
            </div>
            <div className="vert-label-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required onChange={e => { setConfirmPassword(e.target.value) }}></input>
                <span className="input-helper-text">{ confirmPWMessage }</span>
            </div>
            <div>
                <button className="big-button" type="button" onClick={ updatePassword }>Update Password</button>
            </div>
        </form>
    )
}