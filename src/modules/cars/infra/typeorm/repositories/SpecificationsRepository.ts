
import { Specification } from "../entities/Specification";
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO } from "../../../interfaces/ISpecificationsRepository";


class SpecificationsRepository implements SpecificationsRepository {
  private repository: Repository<Specification>;

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({name});
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export { SpecificationsRepository };
