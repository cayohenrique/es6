import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-error.js';

export class FleetDataService {

    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    getCarByLicense(license) {
        return  this.cars.find(function(car) {
            return car.license === license;
        })
    }

    getCarSortedByLicense() {
        return this.cars.sort(function(car1, car2) {
            if (car1.license < car2.license)
                return -1;
            if (car2.license < car1.license)
                return -1;
            return 0;
        })
    }

    filterCarsByMake(filter) {
        return this.cars.filter(car => car.make.indexOf(filter) >= 0);
    }

    loadData(fleet) {
        for (let data of fleet) {
            switch(data.type) {
                case 'car':
                    let car = this.loadCar(data);
                    this.cars.push(car);
                    break;
                case 'drone':
                    let drone = this.loadDrone(data);
                    this.drones.push(drone);
                    break;
                default:
                    let e = new DataError('invalid vehicle type', data);
                    this.errors.push(e);
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch (e) {
                this.errors.push(new DataError('error loading car', car));
        }
        return null;
    }

    loadDrone(drone) {
        try {
            let d = new Drone(drone.license, drone.model, drone.latLong);
            d.airTimeHours = drone.airTimeHours;
            d.base = drone.base;
            return d;
        } catch (e) {
            this.errors.push(new DataError('error loading drone', drone));
        }
        return null;
    }
}