import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Dwarf, Elf, Halfling, Orc } from './Races';
import Archetypes, { Mage, Necromancer, Ranger, Warrior } from './Archetypes';
import getRandomInt from './utils';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetypes;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy?: Energy | undefined;
  private _maxLifePoints: number;

  constructor(name: string, raceType?: string, archType?: string) {
    this._race = this.createRace(raceType, name);
    this._archetype = this.createArchetype(archType, name);
    this._lifePoints = this.maxLifePoints;
    this._strength = this.generateAttribute();
    this._defense = this.generateAttribute();
    this._dexterity = this.generateAttribute();
    this._energy = this.generateEnergy(this._archetype);
    this._maxLifePoints = this.getMaxLifPoints();
  }

  private createRace(
    raceType: string | undefined,
    name: string,
  ): Race {
    switch (raceType) {
      case 'dwarf':
        return new Dwarf(name, this._dexterity);
      case 'halfling':
        return new Halfling(name, this._dexterity);
      case 'orc':
        return new Orc(name, this._dexterity);
      default:
        return new Elf(name, this._dexterity);
    }
  }

  private createArchetype = (
    archType: string | undefined,
    name: string,
  ): Archetypes => {
    const type = archType || 'Elf';

    switch (type) {
      case 'necromancer':
        return new Necromancer(name);
      case 'ranger':
        return new Ranger(name);
      case 'warrior':
        return new Warrior(name);
      default:
        return new Mage(name);
    }
  };

  private generateEnergy(archetype: Archetypes): Energy {
    const type = archetype.energyType;
    const amount = this.generateAttribute();
    return { type_: type, amount };
  }
  
  private getMaxLifPoints(): number {
    const { maxLifePoints } = this._race;
    return Math.floor(maxLifePoints / 2);
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetypes {
    return this._archetype;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy | undefined {
    if (this._energy) {
      const type = this._energy.type_;
      const { amount } = this._energy;
      return { type_: type, amount };
    }
    return undefined;
  }
  
  attack(enemy: Fighter): void {
    enemy.receiveDamage(this.strength);
  }
  
  receiveDamage(attackPoints: number): number {
    const dmg = attackPoints - this._defense;
    if (dmg > 0) this._lifePoints -= dmg;
    else this._lifePoints -= 1;
    if (this._lifePoints < 1) this._lifePoints = -1;
    return this._lifePoints;
  }
  
  private generateAttribute = (): number => getRandomInt(1, 10);

  levelUp(): void {
    this._maxLifePoints += this.generateAttribute();

    if (this.race.maxLifePoints <= this._maxLifePoints) {
      console.log('entrei no if Max Race', this.race.maxLifePoints);
      
      console.log('entrei no if Max Life Points', this._maxLifePoints);
      this._maxLifePoints = this.race.maxLifePoints;
    }
    console.log('Max Life Points', this._maxLifePoints);
    
    this._lifePoints = this.maxLifePoints;
    this._strength += this.generateAttribute();
    this._dexterity += this.generateAttribute();
    this._defense += this.generateAttribute();
    if (this._energy) this._energy.amount = 10;
  }

  special?(enemy: Fighter): void {
    if (this._energy && this._energy.amount >= 4) {
      this._energy.amount -= 4;
      enemy.receiveDamage((this._strength * this.generateAttribute()) / 2);
    }
  }
}

export default Character;