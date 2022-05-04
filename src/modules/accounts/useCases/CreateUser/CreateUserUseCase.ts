import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../interfaces/IUsersRepository";
import { hash } from "bcrypt"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){};

    async execute({name/* , username */, email, driver_license, password, isAdmin}: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            /* username, */
            email,
            driver_license,
            password: passwordHash,
            isAdmin
        })
    }
}

export { CreateUserUseCase}