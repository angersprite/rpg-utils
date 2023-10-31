export default class UserService {
    public async registerUser(email: string, userName: string, password: string) {
        let requestBody = JSON.stringify({
            email: email,
            userName: userName,
            password: password
        })
        const response = await this.postAPI('auth/register', requestBody)
            .then((response) => response.text())
        return response
    }

    public async userNameExists(userName: string) {
        const response = await this.getAPI(`auth/userNameExists/${userName}`)
            .then((response) => response.text())
        return response
    }

    public async emailExists(email: string) {
        const response = await this.getAPI(`auth/emailExists/${email}`)
            .then((response) => response.text())
        return response
    }

    private async postAPI(endpoint: string, postBody: string) {
        const response = await fetch(`/api/${endpoint}`, {
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
        const response = await fetch(`/api/${endpoint}`, {mode: 'cors'})
        return response
    }
}