"use client"
import Link from 'next/link'

let isMenuOpen = false

export default function NavMenu(props) {
    return (
        <>
            <div className="nav-container">
                <div className="nav-title">Kate&apos;s RPG Utilities</div>
                <button onClick={() => {toggleMenu(!isMenuOpen)}} className="burger-menu">☰</button>
            </div>
            <div className="nav-link-container">
                {
                    props.navLinks.map(link => {
                        return (<Link id={link.id} key={link.id} className="nav-link" href={link.route} onClick={() => {handleClickLink(link.id)}}>{link.label}</Link>)
                    })
                }
            </div>
        </>
    )
}

function toggleMenu(toggleVal) {
    isMenuOpen = toggleVal
    if (toggleVal) {
        document.querySelector(".nav-link-container").classList.add('open')
    }
    else {
        document.querySelector(".nav-link-container").classList.remove('open')
    }
}

function handleClickLink(linkId) {
    toggleMenu(false);
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active')
    })
    document.querySelector(`#${linkId}`).classList.add('active')
}