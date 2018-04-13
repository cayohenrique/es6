
import {Vehicle} from './vehicle.js';

export class Car extends Vehicle {
    start() {
        super.start();
        console.log('starting Car')
    }
}