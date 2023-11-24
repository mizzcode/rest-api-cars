import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  // membuat type Cars
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  availableAt!: Date;
  transmission!: string;
  available!: boolean;
  type!: string;
  year!: number;
  options!: string;
  specs!: string;
  created_by!: string;
  updated_by!: string;

  static get tableName() {
    return 'cars';
  }
  // validasi http request body
  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'plate',
        'manufacture',
        'model',
        'image',
        'rentPerDay',
        'capacity',
        'description',
        'transmission',
        'type',
        'year',
        'options',
        'specs',
      ],
      properties: {
        plate: { type: 'string', minLength: 5 },
        manufacture: { type: 'string', minLength: 3 },
        model: { type: 'string', minLength: 2 },
        rentPerDay: { type: 'number', minimum: 100_000 },
        capacity: { type: 'number', minimum: 1 },
        year: { type: 'number', minimum: 2010 },
      },
    };
  }
}

export type Cars = ModelObject<CarsModel>;
