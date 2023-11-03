export default class NPC {
    public charClass: string = ""
    public race: string = ""
    public firstName: string = ""
    public lastName: string = ""
    public hitPoints: string = ""
    public armorName: string = ""
    public armorClass: string = ""
    public weapon: string = ""
    public weaponDamage: string = ""
    public toHit: string = ""
    public description: string = ""
    public skills: string[] = []

    constructor(charClass: string, race: string, firstName: string, lastName: string,
        hitPoints: string, armorName: string, armorClass: string, toHit: string, 
        weapon: string, weaponDamage: string, description: string, skills: string[]) {
        this.charClass = charClass
        this.race = race
        this.firstName = firstName
        this.lastName = lastName
        this.hitPoints = hitPoints
        this.armorName = armorName
        this.armorClass = armorClass
        this.toHit = toHit
        this.weapon = weapon
        this.weaponDamage = weaponDamage
        this.description = description
        this.skills = skills
    }
}