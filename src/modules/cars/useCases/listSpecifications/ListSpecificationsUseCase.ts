import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { Category } from "../../entities/Category";
import { inject, injectable } from "tsyringe";

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
