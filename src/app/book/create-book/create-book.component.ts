import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Author} from '../../model/author';
import {Book} from '../../model/book';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthorService} from '../../service/author.service';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  authors: Author[]

  constructor(private authorService: AuthorService, private bookService: BookService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  onAddBook(addForm: NgForm): void {

      let book: Book = {
        name: addForm.value.name,
        description: addForm.value.description,
        author : {
          id: addForm.value.authorId,
        }
      };
      this.bookService.addBook(book).subscribe(
        (response : Book) => {
          console.log(response);
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      )
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
