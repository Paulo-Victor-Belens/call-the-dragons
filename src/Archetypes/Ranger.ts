import { EnergyType } from '../Energy';
import Archetype from './Archetypes';

class Ranger extends Archetype {
  private _type: EnergyType;
  private static _instances = 0;

  constructor(name: string) {
    super(name);
    this._type = 'stamina';
  }

  get energyType(): EnergyType {
    return this._type;
  }

  static createdArchetypeInstances() {
    Ranger._instances += 1;
    return Ranger._instances;
  }
}

export default Ranger;