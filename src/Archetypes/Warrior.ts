import { EnergyType } from '../Energy';
import Archetypes from './Archetypes';

class Warrior extends Archetypes {
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
    Warrior._instances += 1;
    return Warrior._instances;
  }
}

export default Warrior;