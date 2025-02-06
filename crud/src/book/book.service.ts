import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';

import * as crypto from 'crypto';
import { PaginatioDTO } from 'src/common/dto/pagination.dto';
import { Pagination } from 'src/common/entity/pagination.entity';
import { IPaginationReturn } from 'src/interface/IPaginationReturn';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
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

  async findAll(paginationDTO: PaginatioDTO): Promise<EndMessage> {

    let endMessage: EndMessage = {data: '', status: HttpStatus.OK};
    try{
      const books: [Book[], number] = await this.bookRepository.findAndCount({
        take:paginationDTO.limit,
        skip:paginationDTO.offset,
        order: {title: 'DESC'}
      });

      const pagination: Pagination = new Pagination(
        paginationDTO.limit,
        paginationDTO.offset,
        'book',
        Number(books[1])
      )
  
      const paginationObject: IPaginationReturn = {
        firstPage: pagination.firstPage(),
        previousPage: pagination.previousPage(),
        nextPage: pagination.nextPage(),
        lastPage: pagination.lastPage()
      };

      if(!paginationDTO.offset || !paginationDTO.limit) {
        return endMessage = {data: books[0], status: HttpStatus.OK};
      };
  
      return endMessage = {data: {contentList: books[0], pagination: paginationObject}, status: HttpStatus.OK}
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
