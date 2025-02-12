import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { EndMessage } from 'src/interface/EndMessage';
import { CreatePaginationDTO } from 'src/common/dto/create-pagination.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(createPaginationDTO: CreatePaginationDTO): Promise<EndMessage>;
    findOne(uuid: string): Promise<Book>;
    create(createBookDTO: CreateBookDto): Promise<EndMessage>;
}
