import { useState}  from 'react'

export default class UserService {
    private apiURL = 'https://goonr-api.onrender.com'

    public async registerUser(email: string, userName: string, password: string) {
        let requestBody = JSON.stringify({
            email: email,
            userName: userName,
            password: password
        })
        const response = this.postAPI('register', requestBody)
            .then((response) => response.text())
        return response
    }

    public async login(userName: string, password: string) {
        let requestBody = JSON.stringify({
            userName: userName,
            password: password
        })
        const response = await this.postAPI('login', requestBody)
            .then((response) => response.text())
        // need to return true/false and let caller set login status
    }

    public async userNameExists(userName: string) {
        const response = await this.getAPI(`userNameExists/${userName}`)
            .then((response) => response.text())
        return response
    }

    public async emailExists(email: string) {
        const response = await this.getAPI(`emailExists/${email}`)
            .then((response) => response.text())
        return response
    }

    private async postAPI(endpoint: string, postBody: string) {
        const response = await fetch(`${this.apiURL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: postBody
        })
        
        return response
    }

    private async getAPI(endpoint: string) {
        return fetch(`${this.apiURL}/${endpoint}`, {mode: 'cors'})
    }
}