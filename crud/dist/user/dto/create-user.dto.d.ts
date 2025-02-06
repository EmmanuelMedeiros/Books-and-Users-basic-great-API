import { IUser } from "src/interface/IUser";
export declare class CreateUserDTO implements Pick<IUser, "name" | "password"> {
    readonly name: string;
    readonly password: string;
    constructor(name: string, password: string);
}
