import generateNPC from '../npcGenerator.js'

export async function POST (request){
    let NPC = await generateNPC(request.body.classID, request.body.raceID)
    return new Response(NPC)
}