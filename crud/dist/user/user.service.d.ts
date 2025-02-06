import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { CreateUserDTO } from './dto/create-user.dto';
import { Book } from 'src/book/entities/book.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[] | null>;
    findOne(uuid: string): Promise<User | null>;
    create(createUserDTO: CreateUserDTO): Promise<EndMessage>;
    update(updateUserDTO: UpdateUserDTO, userUUID: string): Promise<EndMessage>;
    delete(user: User): Promise<EndMessage>;
    appendBook(user: User, book: Book): Promise<EndMessage>;
    removeBook(user: User, bookUUID: string): Promise<EndMessage>;
}
