import { ISpecificationsRepository } from "../../interfaces/ISpecificationsRepository";
import { Category } from "../../models/Category";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Category[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
