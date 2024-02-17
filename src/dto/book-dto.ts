export interface BookDto {
  id: number;
  title: string;
  description: string;
  author: string;
  publicationDate: Date;
  genre:
    | 'Science Fiction'
    | 'Satire'
    | 'Drama'
    | 'Action'
    | 'Romance'
    | 'Mystery'
    | 'Horror';
  price: string;
}
