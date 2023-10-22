import NPC from './NPC.ts'

export default function NPCDisplay(props) {
    let skillList = <ul></ul>
    if (props.npc.skills) {
        skillList = (
            <ul>
                {props.npc.skills.map(sk => {return (<li key={sk.id}>{sk.name} {sk.description}</li>)})}
            </ul>
        )
    }
    return (
        <div className="npc-display" >
            <div className="npc-field-row">
                <div className="npc-field-name">Name</div>
                <div className="npc-field-val" id="npcName">{props.npc.firstName} {props.npc.lastName}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Class</div>
                <div className="npc-field-val" id="npcClass">{props.npc.charClass}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Race</div>
                <div className="npc-field-val" id="npcRace">{props.npc.race}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">HP</div>
                <div className="npc-field-val" id="hitPoints">{props.npc.hitPoints}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">AC</div>
                <div className="npc-field-val" id="armorClass">{props.npc.armorName} {props.npc.armorClass}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Thac0</div>
                <div className="npc-field-val" id="toHit">{props.npc.toHit}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Weapon</div>
                <div className="npc-field-val" id="weapon">{props.npc.weapon} {props.npc.weaponDamage}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Description</div>
                <div className="npc-field-val" id="desc">{props.npc.description}</div>
            </div>
            <div className="npc-field-row">
                <div className="npc-field-name">Special Skill(s)</div>
                <div className="npc-field-val" id="desc">{skillList}
                </div>
            </div>
        </div>
    );
}