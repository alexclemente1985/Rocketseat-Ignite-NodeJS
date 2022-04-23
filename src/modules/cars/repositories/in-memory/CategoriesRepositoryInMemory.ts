import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../interfaces/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository{
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(c => c.name === name);
        return category;
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name, description
        });

        this.categories.push(category)
    }

}

export { CategoriesRepositoryInMemory }