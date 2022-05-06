import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Category[]> {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
