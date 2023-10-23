import { getRace } from '../../npcService.js'

export async function GET (request, context){
    let Race = await getRace(context.params.raceID)
    return new Response(Race)
} 
