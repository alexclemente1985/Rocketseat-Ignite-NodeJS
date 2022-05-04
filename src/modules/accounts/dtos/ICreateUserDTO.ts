interface ICreateUserDTO{
    name: string;
    /* username: string; */
    password: string;
    email: string;
    driver_license: string;
    id?: string;
    avatar?: string;
    isAdmin?:boolean;
}

export { ICreateUserDTO}