import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import CreateGroupForm from './CreateGroupForm'

export default async function GroupCreation() {
    const session = await getServerSession(authOptions)
    const callBackURL = 'http://localhost:3000/playerGroup/:ID'
    
    return (
        <div className="card">
            <CreateGroupForm session={session}></CreateGroupForm>
            
        </div>
    )
}