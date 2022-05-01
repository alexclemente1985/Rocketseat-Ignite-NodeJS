import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/accounts/interfaces/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICategoriesRepository } from "../../modules/cars/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/interfaces/ISpecificationsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "../../modules/cars/interfaces/ICarsRepository";
import { ICarsImagesRepository } from "../../modules/cars/interfaces/ICarsImagesRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository";


// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

// ISpecificationRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

// IUsersRepository
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

// ICarsRepository
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);

// ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)