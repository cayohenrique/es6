import {Vehicle} from './vehicle.js';
export class Drone extends Vehicle {
    start() {
        super.start();
        console.log('starting Drone')
    }
}
