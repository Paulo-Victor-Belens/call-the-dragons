import { EnergyType } from '../Energy';
import Archetype from './Archetypes';

class Mage extends Archetype {
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
    Mage._instances += 1;
    return Mage._instances;
  }
}

export default Mage;