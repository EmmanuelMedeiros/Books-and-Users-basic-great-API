import { Module } from '@nestjs/common';
import { UserBooksController } from './user-books.controller';
import { UserBooksService } from './user-books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBooks } from './entity/user-books.entity';
import { UserModule } from 'src/user/user.module';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [UserBooksController],
  providers: [UserBooksService],
  imports: [TypeOrmModule.forFeature([UserBooks]), UserModule, BookModule]
})
export class UserBooksModule {}
