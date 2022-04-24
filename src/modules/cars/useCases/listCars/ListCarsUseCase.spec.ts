import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

describe("List Cars",()=>{
    let listCarsUseCase: ListCarsUseCase;
    let carsRepositoryInMemory: CarsRepositoryInMemory;
    
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });
    
    it("should be able to list all available cars", async ()=>{
        await carsRepositoryInMemory.create({
            name: "Test Car",
            description: "Test Car Description",
            daily_rate: 110.0,
            license_plate: "TES-1010",
            fine_amount: 40,
            brand: "Test Car Brand",
            category_id: "category_id",
        });
        
        const cars = await listCarsUseCase.execute({});
        expect(cars.length).toEqual(1);
    });

    it("should be able to list all available cars by brand", async ()=>{
        await carsRepositoryInMemory.create({
            name: "Test Car",
            description: "Test Car Description",
            daily_rate: 110.0,
            license_plate: "TES-1011",
            fine_amount: 40,
            brand: "Other Test Car Brand",
            category_id: "category_id",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 2",
            description: "Test Car 2 Description",
            daily_rate: 110.0,
            license_plate: "TES-1020",
            fine_amount: 40,
            brand: "Other Test Car Brand 2",
            category_id: "category_id",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 3",
            description: "Test Car 3 Description",
            daily_rate: 110.0,
            license_plate: "TES-1030",
            fine_amount: 40,
            brand: "Other Test Car Brand 3",
            category_id: "category_id",
        });
        
        const cars = await listCarsUseCase.execute({
            brand: "Other Test Car Brand 2"
        });
        expect(cars.length).toEqual(1);
    });

    it("should be able to list all available cars by category_id", async ()=>{
        await carsRepositoryInMemory.create({
            name: "Test Car",
            description: "Test Car Description",
            daily_rate: 110.0,
            license_plate: "TES-1011",
            fine_amount: 40,
            brand: "Other Test Car Brand",
            category_id: "category_id",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 2",
            description: "Test Car 2 Description",
            daily_rate: 110.0,
            license_plate: "TES-1020",
            fine_amount: 40,
            brand: "Other Test Car Brand 2",
            category_id: "category_id 2",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 3",
            description: "Test Car 3 Description",
            daily_rate: 110.0,
            license_plate: "TES-1030",
            fine_amount: 40,
            brand: "Other Test Car Brand 3",
            category_id: "category_id",
        });
        
        const cars = await listCarsUseCase.execute({
            brand: null,
            category_id: "category_id"
        });
        expect(cars.length).toEqual(2);
    });

    it("should be able to list all available cars by name", async ()=>{
        await carsRepositoryInMemory.create({
            name: "Test Car",
            description: "Test Car Description",
            daily_rate: 110.0,
            license_plate: "TES-1011",
            fine_amount: 40,
            brand: "Other Test Car Brand",
            category_id: "category_id",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 2",
            description: "Test Car 2 Description",
            daily_rate: 110.0,
            license_plate: "TES-1020",
            fine_amount: 40,
            brand: "Other Test Car Brand 2",
            category_id: "category_id",
        });

        await carsRepositoryInMemory.create({
            name: "Test Car 3",
            description: "Test Car 3 Description",
            daily_rate: 110.0,
            license_plate: "TES-1030",
            fine_amount: 40,
            brand: "Other Test Car Brand 3",
            category_id: "category_id",
        });
        
        const cars = await listCarsUseCase.execute({
            brand: null,
            category_id: null,
            name: "Test Car 2"
        });
        expect(cars.length).toEqual(1);
    });
})