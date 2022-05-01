import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository{
    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        
        Object.assign(specification,{
            description,
            name
        })
        
        this.specifications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (sp => sp.name === name)
        );
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(
            (sp => ids.includes(sp.id))
        );

        return allSpecifications;
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }

}

export {SpecificationsRepositoryInMemory}