"use client"

import GoonrService from './GoonrService.ts'
/* import { useState } from 'react'; */
import { useState, useEffect } from 'react';
import NPCDisplay from './NPCDisplay.jsx'
import NPC from './NPC.ts'
import './Goonr.css'

const goonrService = new GoonrService

export default function NPCBuilder() {
    let [npc, setNPC] = useState(new NPC())
    const [allClasses, setClasses] = useState([]);
    const [allRaces, setRaces] = useState([]);
    const [ raceId, setRaceID ] = useState(-1)
    const [ classId, setClassID ] = useState(-1)
    
    useEffect(() => {
        goonrService.getClasses()
          .then((data) => {
            setClasses(data);
          })
          .catch((err) => {});
    }, []);

    useEffect(() => {
        goonrService.getRaces()
          .then((data) => {
            setRaces(data);
          })
          .catch((err) => {});
    }, []);

    const generateNPC = async () => {
        goonrService.getNPC(classId, raceId)
            .then((data) => {
                setNPC(new NPC(
                    data.className,
                    data.race,
                    data.firstName, 
                    data.lastName,
                    data.hitPoints,
                    data.armorType,
                    data.armorClass,
                    data.toHit,
                    data.weapon,
                    data.weaponDamage,
                    data.descriptors,
                    data.skills
                ))
            })
    }

    return (
        <div className="card">
            <h2>NPC Generator</h2>
            <div className="npc-form">
                <form>
                    <div className="npc-form-filters">
                        <div className="npc-filter">
                            <label htmlFor="raceSelect">Race:</label>
                            <select id="raceSelect" onChange={(e) => setRaceID(e.target.value)}>
                                <option value="-1">Random</option>
                                {allRaces.map(c => {return (<option value={c.id} key={c.id}>{c.name}</option>)})}
                            </select>
                        </div>

                        <div className="npc-filter">
                            <label htmlFor="classSelect">Class:</label>
                            <select id="classSelect" onChange={(e) => setClassID(e.target.value)}>
                                <option value="-1">Random</option>
                                {allClasses.map(c => {return (<option value={c.id} key={c.id}>{c.name}</option>)})}
                            </select>
                        </div>
                    </div>
                    <button id="generation-button" onClick={generateNPC} type="button">Generate</button>
                </form>
            </div>
            <NPCDisplay npc={npc}></NPCDisplay>
        </div>
    );
}