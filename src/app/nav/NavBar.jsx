import './NavBar.css'
import { getSession } from 'next-auth/react'
import NavMenu from './NavMenu.jsx'


export default async function NavBar(props) {
    const navLinks = [
        {id:"npcLink", label:"NPCs", route:"/npc"},
        {id:"initLink", label:"Initiative", route:"/init"},
        {id:"dungLink", label:"Dungeon", route:"/dungeon"},
        {id:"loginLink", label:"Login", route:"/auth/login"},
    ]
    const session = await getSession()
    /* if (session) {
        console.log('yes')
    } else {
        console.log('no')
    } */

    return (
        <header>
            <nav className="nav-bar">
                <NavMenu navLinks={navLinks}></NavMenu>
            </nav>
        </header>
    )
}