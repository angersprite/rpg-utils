import { createGroup } from '../PlayerGroupService'
import { NextResponse } from 'next/server'

export async function POST(req,res){
    const data = await req.formData()
    const userName = data.get('userName')
    const groupName = data.get('groupName')
    let callBackURL = data.get('callBackURL')

    const groupID = await createGroup(groupName, userName)
    callBackURL = callBackURL.replace(':ID', groupID)
    
    return {
        redirect: {
          permanent: false,
          destination: "/"
        }
      }
    //return NextResponse.redirect(callBackURL);
    // redirect to localhost is broken?
    // find if possible to fix
    // or find alternate way to redirect
    // or update form to use js hooks to send form data
} 