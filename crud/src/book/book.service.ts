import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';

import * as crypto from 'crypto';
import { CreatePaginationDTO } from 'src/common/dto/create-pagination.dto';
import { PaginationRequirements } from 'src/common/pagination/entity/paginationRequirements.entity';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { Pagination } from 'src/common/pagination/entity/pagination.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly paginationService: PaginationService
  ) {}

  async create(createBookDTO: CreateBookDto) {
    let endMessage: EndMessage = {data: '', status: HttpStatus.OK}
    try {

        const newBook: Book = new Book(
          crypto.randomUUID(),
          createBookDTO.author.trim(),
          createBookDTO.price,
          createBookDTO.title.trim(),
          []
        )

        await this.bookRepository.insert(newBook);
        endMessage = {data: newBook, status: HttpStatus.CREATED};
    }catch(err) {
        endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
    }
    return endMessage;
  }

  async findAll(createPaginationDTO: CreatePaginationDTO): Promise<EndMessage> {

    let endMessage: EndMessage = {data: '', status: HttpStatus.OK};

    try{

      console.log(createPaginationDTO.limit)

      const books: [Book[], number] = await this.bookRepository.findAndCount({
        take:createPaginationDTO.limit,
        skip:createPaginationDTO.offset,
        order: {title: 'DESC'}
      });

      if(!createPaginationDTO.limit || !createPaginationDTO.offset) {
        return endMessage = {data: {content: books[0]}, status: HttpStatus.OK}
      } else {
        const paginationRequirements: PaginationRequirements = new PaginationRequirements(
          createPaginationDTO.limit,
          books[1],
          createPaginationDTO.offset,
          'book'
        );

        const pagination: Pagination = this.paginationService.paginate(paginationRequirements);
        return endMessage = {data: {contentList: books[0], pagination: pagination}, status: HttpStatus.OK}
      }
    }
    catch(err) {
      endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
    }
    return endMessage;
  }

  async findOne(uuid: string): Promise<Book|null> {
    const book: Book|null = await this.bookRepository.findOne({
      where: {
        uuid: uuid
      }
    })
    return book;
  }
  
}
