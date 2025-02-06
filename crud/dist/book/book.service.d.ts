import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { PaginatioDTO } from 'src/common/dto/pagination.dto';
export declare class BookService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDTO: CreateBookDto): Promise<EndMessage>;
    findAll(paginationDTO: PaginatioDTO): Promise<EndMessage>;
    findOne(uuid: string): Promise<Book | null>;
}
