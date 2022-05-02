import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";


interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_data: Date
}

/* @injectable() */
class CreateRentalUseCase{
    constructor(
        /* @inject("RentalsRepository") */
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({user_id, car_id, expected_return_data}: IRequest): Promise<Rental>{
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date: new Date()
        });

        return rental;



    }
}

export {CreateRentalUseCase}