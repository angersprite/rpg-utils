class GoonrService {
    public async getClasses(id: number) {
        let endPoint = id ? `npc-generator/class/${id}` : 'npc-generator/class'
        let classes = await this.getAPI(endPoint)
            .then(function(response) { return response.json() })
        return classes
    }

    public async getRaces(id: number) {
        const endPoint = id ? `npc-generator/race/${id}` : 'npc-generator/race'
        let races = await this.getAPI(endPoint)
            .then(function(response) { return response.json() })
        return races
    }

    public async getNPC(classID: number, raceID: number) {
        let postBody = JSON.stringify({
            classID: classID,
            raceID: raceID
        })
        let npc = await this.postAPI('npc-generator/npc', postBody)
            .then(function(response) { return response.json() })
        return npc
    }

    private async postAPI(endpoint: string, postBody: string) {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: postBody
        })
        
        return response
    }

    private async getAPI(endpoint: string) {
        const response = await fetch(`/api/${endpoint}`)
        
        return response
    }
}

export default GoonrService