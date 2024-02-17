import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [ PrismaService, BookService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

  ],
})
export class AppModule {}
