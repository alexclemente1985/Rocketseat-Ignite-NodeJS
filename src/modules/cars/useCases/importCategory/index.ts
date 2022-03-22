import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoriesRepository: CategoriesRepository =
  CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
