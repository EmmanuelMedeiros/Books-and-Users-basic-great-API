import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { CreatePaginationDTO } from 'src/common/dto/create-pagination.dto';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
export declare class BookService {
    private readonly bookRepository;
    private readonly paginationService;
    constructor(bookRepository: Repository<Book>, paginationService: PaginationService);
    create(createBookDTO: CreateBookDto): Promise<EndMessage>;
    findAll(createPaginationDTO: CreatePaginationDTO): Promise<EndMessage>;
    findOne(uuid: string): Promise<Book | null>;
}
