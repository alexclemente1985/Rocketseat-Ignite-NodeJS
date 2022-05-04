import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../interfaces/IUsersRepository";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }
    async create({name/* , username */, email, driver_license, password, avatar, id, isAdmin}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name/* , username */, email, driver_license, password, avatar, id, isAdmin
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

}

export { UsersRepository }