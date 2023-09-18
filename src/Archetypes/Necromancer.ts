import { EnergyType } from '../Energy';
import Archetypes from './Archetypes';

class Necromancer extends Archetypes {
  private _type: EnergyType;
  private static _instances = 0;

  constructor(name: string) {
    super(name);
    this._type = 'mana';
  }

  get energyType(): EnergyType {
    return this._type;
  }

  static createdArchetypeInstances() {
    Necromancer._instances += 1;
    return Necromancer._instances;
  }
}

export default Necromancer;