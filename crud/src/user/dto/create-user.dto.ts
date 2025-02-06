import { IUser } from "src/interface/IUser";

export class CreateUserDTO implements Pick<IUser, "name"|"password">{
    public readonly name: string;
    public readonly password: string;

	constructor(name: string, password: string) {
		this.name = name;
		this.password = password;
	}

}