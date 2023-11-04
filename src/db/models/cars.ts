import { ModelObject, Model } from 'objection';

export class CarsModel extends Model {
    id!: number;
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

    static get tableName() {
        return 'cars';
    }
}

export type Cars = ModelObject<CarsModel>;
