import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [,token] = authHeader.split(" ");

    
    try {
        const {sub: userId} = verify(token, 'cbdd3ff3c0cac68c558897b44fc58ae1') as IPayload;
        
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(userId);

        if(!user){
            throw new AppError("User does not exists!", 401);
        }

        req.user = {
            id: userId
        }

        next();

    } catch{
        throw new AppError("Invalid token", 401);
    }
}