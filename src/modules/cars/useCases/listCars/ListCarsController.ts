import { resolve } from 'path';
import { Request, Response } from "express";
import { ListCarsUseCase } from './ListCarsUseCase';
import { container } from 'tsyringe';

class ListCarsController{
    async handle(req: Request, res: Response): Promise<Response>{
        const {brand, name, category_id} = req.query;

        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string
        });

        return res.status(200).json(cars);
    }
}

export {ListCarsController}