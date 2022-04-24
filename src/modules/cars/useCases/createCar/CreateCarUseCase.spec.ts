import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

beforeEach(()=>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
})

describe("Create Car", ()=>{
    it("should be able to create a new car", async () =>{
       const car = await createCarUseCase.execute({
            name: "Test Car", 
            description: "Description Test Car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 40, 
            brand: "Brand", 
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with a existent license plate", ()=>{
        expect(async()=>{
            await createCarUseCase.execute({
                name: "Test Car 1", 
                description: "Description Test Car 1", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 40, 
                brand: "Brand", 
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Test Car 2", 
                description: "Description Test Car 2", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 40, 
                brand: "Brand", 
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should be able to create a car with available true by default", async ()=>{
        const car = await createCarUseCase.execute({
                name: "Test Car Available", 
                description: "Description Test Car Available", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 40, 
                brand: "Brand", 
                category_id: "category"
            });
            
        expect(car.available).toBe(true);
    })
})