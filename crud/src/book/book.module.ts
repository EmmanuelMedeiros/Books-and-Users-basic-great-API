import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { PaginationService } from 'src/common/pagination/service/pagination.service';
import { paginationModule } from 'src/common/pagination/module/pagination.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([Book]), paginationModule],
  exports: [BookService]
})
export class BookModule {}
