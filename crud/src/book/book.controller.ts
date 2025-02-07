import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, HttpCode, Request, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

import * as crypto from 'crypto';
import { EndMessage } from 'src/interface/EndMessage';
import { PaginatioDTO } from 'src/common/dto/pagination.dto';
import { CacheInterceptor } from 'src/common/interceptor/cacheInterceptor';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDTO: PaginatioDTO, @Request() req) {
    const pagination: PaginatioDTO = {
      limit: paginationDTO.limit,
      offset: paginationDTO.offset,
      reqHost: req.host
    }
    const serviceResponse: EndMessage = await this.bookService.findAll(pagination);
    if(serviceResponse.status !== HttpStatus.OK) {
      throw new HttpException(serviceResponse.data, HttpStatus.BAD_REQUEST);
    }
    return serviceResponse;
  }

  @Get('/:uuid')
  async findOne(@Param('uuid') uuid: string) {
    const book: Book|null = await this.bookService.findOne(uuid);
    if(!book) {
      throw new HttpException("No book found for this UUID", HttpStatus.NOT_FOUND);
  }
  return book;
  }

  @Post()
  async create(@Body() createBookDTO: CreateBookDto) {
    const serviceResponse: EndMessage = await this.bookService.create(createBookDTO);
    if(serviceResponse.status !== HttpStatus.CREATED) {
        throw new HttpException(serviceResponse.data, HttpStatus.BAD_REQUEST);
    }
    return serviceResponse;
  }


}
