import { useState, useEffect } from 'react'

class GoonrService {
    private apiURL = 'https://goonr-api.onrender.com'
    
    public async getClasses(id: number) {
        let classes = this.getAPI('classes')
        return classes
    }

    public async getRaces(id: number) {
        let races = this.getAPI('races')
        return races
    }

    public async getNPC(classID: number, raceID: number) {
        let postBody = JSON.stringify({
            classID: classID,
            raceID: raceID
        })
        let npc = this.postAPI('npc', postBody)
        return npc
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

export default GoonrService