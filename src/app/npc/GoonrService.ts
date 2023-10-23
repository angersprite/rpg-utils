class GoonrService {
    public async getClasses(id: number) {
        let classes = await this.getAPI('npc-generator/class')

        return classes
    }

    public async getRaces(id: number) {
        let races = await this.getAPI('npc-generator/race')
        return races
    }

    public async getNPC(classID: number, raceID: number) {
        let postBody = JSON.stringify({
            classID: classID,
            raceID: raceID
        })
        let npc = this.postAPI('npc-generator/npc', postBody)
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
        return fetch(`/api/${endpoint}`)
    }
}

export default GoonrService