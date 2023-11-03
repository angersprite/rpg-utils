import * as npcService from './npcService'
import NPC from '../../api/npc-generator/NPC'

export default async function generateNPC(classID: number, raceID: number) {
    let npc = new NPC

    await npcService.getClass(classID)
    .then(c => {
        npc.className = c[0].name
        npc.hitPoints = Math.floor(Math.random() * (c[0].hit_die - 1 + 1)) + 1
        npc.toHit = c[0].thac0
        classID = c[0].id
    })
    await Promise.all([
        npcService.getRace(raceID) .then(r => { npc.race = r[0].name }),
        npcService.getFirstName() .then(fn => { npc.firstName = fn  }),
        npcService.getLastName().then(ln => { npc.lastName = ln  }),
        npcService.getWeapon(classID)
            .then(w => {
                if (w.length > 0) {
                    npc.weapon = w[0].name
                    npc.weaponDamage = w[0].damage
                }
            }),
        npcService.getArmor(classID)
            .then(a => {
                if (a.length > 0) {
                    npc.armorType = a[0].name
                    npc.armorClass = a[0].armor_class
                }
            }),
        npcService.getDescriptors(1) .then(desc => { npc.descriptors = desc }),
        npcService.getSkills(classID, 1).then(skills => { npc.skills = skills }),
        npcService.getItems(1).then(i => { npc.items = i  })
    ])

    return npc
}