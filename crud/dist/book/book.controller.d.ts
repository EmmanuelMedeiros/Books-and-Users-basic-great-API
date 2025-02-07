import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { EndMessage } from 'src/interface/EndMessage';
import { PaginatioDTO } from 'src/common/dto/pagination.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(paginationDTO: PaginatioDTO, req: any): Promise<EndMessage>;
    findOne(uuid: string): Promise<Book>;
    create(createBookDTO: CreateBookDto): Promise<EndMessage>;
}
