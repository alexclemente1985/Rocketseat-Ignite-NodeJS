import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../interfaces/IRentalsRepository";

dayjs.extend(utc);
interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date
}

@injectable()
class CreateRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rental>{
        const minimumHour = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();
        const compareDate = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
          );

        if(compareDate < minimumHour){
            throw new AppError("Invalid return time!");
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