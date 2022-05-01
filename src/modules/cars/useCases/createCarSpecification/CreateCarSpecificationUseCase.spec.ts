import { AppError } from './../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        
    })

    it("should be able to add a new specification to the car", async ()=>{
        const car = await createCarUseCase.execute({
            name: "Test Car", 
            description: "Description Test Car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 40, 
            brand: "Brand", 
            category_id: "category"
        });
        const carId = car.id;
       
        const specification = await specificationsRepositoryInMemory.create({
            description: "teste descrição",
            name: "teste nome"
        });

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: carId, specifications_id});

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })

    it("should not be able to add a new specification to a now-existent car", async ()=>{
        expect(async ()=>{const carId = "1234";
        const specificationsId = ["54321"]
        await createCarSpecificationUseCase.execute({car_id: carId, specifications_id: specificationsId});}
        ).rejects.toBeInstanceOf(AppError);
    })
})