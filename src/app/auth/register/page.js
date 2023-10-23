"use client"
import { useState}  from 'react'
import UserService from '../UserService'
import { useRouter } from 'next/navigation'

export default function Register(props) {
    const router = useRouter()
    const userService = new UserService()
    const [state, setState] = useState({
        email: '',
        userName: '',
        password: '',
        confirmPassword: ''
    })
    const changeHandler = e => {
        setState({...state, [e.target.name]: e.target.value})
    }
    let [emailMessage, setEmailMessage] = useState('')
    let [userNameMessage, setUserNameMessage] = useState('')
    let [passwordMessages, setPasswordMessages] = useState([])
    let [confirmPWMessage, setConfirmPWMessage] = useState([])

    const isEmailValid = async () => {
        setEmailMessage('')
        const emailExists = await userService.emailExists(state.email)
        if (!state.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailMessage('Enter a valid email address')
            return false
        } 
        if (emailExists == 'true') {
            setEmailMessage('This email address has already been registered')
            return false
        }
        return true
    }
    const isUserNameValid = async () => {
        setUserNameMessage('')
        const userNameExists = await userService.userNameExists(state.userName)
        let isValid = true
        if (!(state.userName.length > 2 && state.userName.length < 21)) {
            setUserNameMessage('Username must be between 3 and 20 characters long')
            isValid = false
        } 
        if (userNameExists == 'true') {
            setUserNameMessage('This username has already been registered')
            isValid = false
        }
        return isValid
    }
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
            if (!pol.policy(state.password)) {
                pwMessages.push(pol.helperText)
                isValid = false
            }
        })
        setPasswordMessages(pwMessages)
        return isValid
    }
    const isPasswordConfirmed = () => {
        if (state.password == state.confirmPassword) {
            setConfirmPWMessage('')
            return true
        } else {
            setConfirmPWMessage('Passwords do not match')
            return false
        }
    }
    const tryRegister = async () => {
        let emailCheck = await isEmailValid()
        let usernameCheck = await isUserNameValid()
        let pwCheck = isPasswordValid()
        let pwConfirmCheck = isPasswordConfirmed()

        console.log(emailCheck, usernameCheck, pwCheck, pwConfirmCheck)
        if (emailCheck && usernameCheck && pwCheck && pwConfirmCheck) {
            let isRegistered = userService.registerUser(state.email, state.userName, state.password)
            if (isRegistered) {
                router.push('../registered')
            }
            else {
                // handle error + display message
            }
        }
    }

    return (
        <div className="form-container">
            <form>
                <div className="vert-label-field">
                    <label htmlFor="userName">Email</label>
                    <input type="email" id="email" name="email" required onChange={changeHandler}></input>
                    <span className="input-helper-text">{ emailMessage }</span>
                </div>
                <div className="vert-label-field">
                    <label htmlFor="userName">Username</label>
                    <input type="text" id="userName" name="userName" required onChange={changeHandler}></input>
                    <span className="input-helper-text">{ userNameMessage }</span>
                </div>
                <div className="vert-label-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required  onChange={changeHandler}></input>
                    <ul className="input-helper-text">
                        {passwordMessages.map((m,i) => { return (<li key={i}>{m}</li>) })}
                    </ul>
                </div>
                <div className="vert-label-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required onChange={changeHandler}></input>
                    <span className="input-helper-text">{ confirmPWMessage }</span>
                </div>
                <div>
                    <button className="big-button" type="button" onClick={tryRegister}>Log In</button>
                </div>
            </form>
        </div>
    )
}