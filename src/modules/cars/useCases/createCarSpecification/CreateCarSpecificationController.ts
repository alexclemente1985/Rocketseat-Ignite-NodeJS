import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController{
    async handle(req: Request, resp: Response): Promise<Response>{

        const {id} = req.params;
        const { specifications_id} = req.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id
        });

        return resp.json(cars);
    }
}

export {CreateCarSpecificationController}