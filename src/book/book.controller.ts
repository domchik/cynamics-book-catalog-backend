import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpException, Logger,
} from '@nestjs/common';

import { Book as BookModel } from '@prisma/client';
import { BookService } from './book.service';

//TODO: better log the errors, handle all possible exceptions
@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  async getBooks(): Promise<BookModel[]> {
    try {
      return this.bookService.books({});
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    const book = await this.bookService.book({ id });

    if (!book) {
      this.logger.error('Book not found');
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  @Post()
  async createBook(@Body() bookData: BookModel): Promise<BookModel> {
    try {
      return this.bookService.createBook(bookData);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookData: BookModel,
  ): Promise<BookModel> {
    const book = await this.bookService.book({ id });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return this.bookService.updateBook({ where: { id }, data: bookData });
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookModel> {
    const book = await this.bookService.book({ id });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    try {
      return this.bookService.deleteBook({ id });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
