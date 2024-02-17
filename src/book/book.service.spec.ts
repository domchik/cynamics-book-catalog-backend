import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  book: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BookService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('book', () => {
    it('should return a book by its ID', async () => {
      const bookData = { id: 1, title: 'Test Book', author: 'Test Author' };
      mockPrismaService.book.findUnique.mockResolvedValue(bookData);

      const result = await service.book({ id: 1 });
      expect(result).toEqual(bookData);
    });


  });

  describe('books', () => {
    it('should return a list of books', async () => {
      const bookData = [
        { id: 1, title: 'Test Book 1', author: 'Test Author 1' },
        { id: 2, title: 'Test Book 2', author: 'Test Author 2' },
      ];
      mockPrismaService.book.findMany.mockResolvedValue(bookData);

      const result = await service.books({});
      expect(result).toEqual(bookData);
    });
  });



  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBookData = { title: 'New Book', author: 'New Author' };
      const expectedResult = { id: 1, ...newBookData };
      mockPrismaService.book.create.mockResolvedValue(expectedResult);

      const result = await service.createBook(newBookData);
      expect(result).toEqual(expectedResult);
    });

  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const updateData = { title: 'Updated Book' };
      const updatedBook = { id: 1, ...updateData };
      mockPrismaService.book.update.mockResolvedValue(updatedBook);

      const result = await service.updateBook({
        where: { id: 1 },
        data: updateData,
      });
      expect(result).toEqual(updatedBook);
    });

    it('should throw NotFoundException if the book is not found', async () => {
      mockPrismaService.book.update.mockRejectedValue(new NotFoundException());

      await expect(
        service.updateBook({ where: { id: 1 }, data: {} })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const deletedBook = { id: 1, title: 'Deleted Book', author: 'Author' };
      mockPrismaService.book.delete.mockResolvedValue(deletedBook);

      const result = await service.deleteBook({ id: 1 });
      expect(result).toEqual(deletedBook);
    });

    it('should throw NotFoundException if the book is not found', async () => {
      mockPrismaService.book.delete.mockRejectedValue(new NotFoundException());

      await expect(service.deleteBook({ id: 1 })).rejects.toThrow(NotFoundException);
    });
  });

});
