import { Car } from "../../infra/typeorm/entities/Car";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICarsRepository, ICreateCarDTO } from "../../interfaces/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository{
    cars: Car[] = [];

    async create({
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        name, 
        license_plate
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand, 
            category_id, 
            daily_rate,
            description, 
            fine_amount, 
            name, 
            license_plate
        });

        this.cars.push(car);

        return car;
    };

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    };

    async findAvailables(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all = this.cars
        .filter(car => car.available);

        if(all.length>0 && (brand || category_id || name)){
           return all.filter(car => 
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
           );
        }
  
        return all;
    }
}

export {CarsRepositoryInMemory}