import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { hash } from "bcrypt"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({name/* , username */, email, driver_license, password}: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        
        const passwordHash = await hash(password, 8);
        
        await this.usersRepository.create({
            name,
            /* username, */
            email,
            driver_license,
            password: passwordHash
        })
    }
}

export { CreateUserUseCase}