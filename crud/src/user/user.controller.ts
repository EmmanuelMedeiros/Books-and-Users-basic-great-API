import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

import * as crypto from 'crypto';
import { EndMessage } from 'src/interface/EndMessage';
import { Book } from 'src/book/entities/book.entity';
import { BookService } from 'src/book/book.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthorizationInterceptor } from 'src/common/interceptor/authorizationInterceptor';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        const userList: User[]|null = await this.userService.findAll();
        if(!userList || userList.length < 1) {
            throw new HttpException("No user found", HttpStatus.NOT_FOUND);
        }
        return userList;
    } 

    @UseGuards(new RoleGuard(['admin']))
    @HttpCode(HttpStatus.OK)
    @Get('/:uuid')
    async findOne(@Param('uuid') uuid: string) {
        const user: User|null = await this.userService.findOne(uuid)

        if(!user) {
            throw new HttpException("No user found for this UUID", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        const serviceResponse: EndMessage = await this.userService.create(createUserDTO);
        if(serviceResponse.status !== HttpStatus.CREATED) {
            throw new HttpException(serviceResponse.data, HttpStatus.BAD_REQUEST);
        }
        return serviceResponse;
    }

    @HttpCode(HttpStatus.OK)
    @Put()
    async update(@Body() updateUserDTO: UpdateUserDTO, @Query('userUUID') userUUID: string) {
        const updatedUser: EndMessage = await this.userService.update(updateUserDTO, userUUID);
        if(updatedUser.status !== HttpStatus.OK) {
            throw new HttpException(updatedUser.data, updatedUser.status);
        }
        return updatedUser;
    }

    @HttpCode(HttpStatus.OK)
    @Delete()
    async delete(@Query('userUUID') userUUID: string) {
        const fetchedUser: User|null = await this.userService.findOne(userUUID);
        if(!fetchedUser) {
            throw new HttpException("No user found for this UUID", HttpStatus.NOT_FOUND);
        };
        const serviceResponse: EndMessage = await this.userService.delete(fetchedUser);
        if(serviceResponse.status !== HttpStatus.OK) {
            throw new HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/append-book') 
    async appendBook(@Body() book: {bookUUID: string}, @Query('userUUID') userUUID: string) {
        const fetchedUser: User|null = await this.userService.findOne(userUUID);
        if(!fetchedUser) {
            throw new HttpException("No user found for this UUID", HttpStatus.NOT_FOUND);
        };
        const fetchedBook: Book|null = await this.bookService.findOne(book.bookUUID);
        if(!fetchedBook) {
            throw new HttpException("No book found for this UUID", HttpStatus.NOT_FOUND);
        };
        const serviceResponse: EndMessage = await this.userService.appendBook(fetchedUser, fetchedBook);
        if(serviceResponse.status !== HttpStatus.OK) {
            throw new HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }

    @HttpCode(HttpStatus.OK)
    @Put('/remove-book')
    async removeBook(@Body() book: {bookUUID: string}, @Query('userUUID') userUUID: string) {
        const fetchedUser: User|null = await this.userService.findOne(userUUID);
        if(!fetchedUser) {
            throw new HttpException("No user found for this UUID", HttpStatus.NOT_FOUND);
        };
        const fetchedBook: Book|null = await this.bookService.findOne(book.bookUUID);
        if(!fetchedBook) {
            throw new HttpException("No book found for this UUID", HttpStatus.NOT_FOUND);
        };
        const serviceResponse: EndMessage = await this.userService.removeBook(fetchedUser, book.bookUUID);
        if(serviceResponse.status !== HttpStatus.OK) {
            throw new HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
}
