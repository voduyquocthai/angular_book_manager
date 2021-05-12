import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {AuthorService} from '../../service/author.service';
import {Author} from '../../model/author';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  authors: Author[]

  updateBook: Book = {}

  index = -1;

  constructor(private bookService: BookService,
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.index = + paramMap.get('id') + 1;
        bookService.getBookById(this.index).subscribe(
          (response: Book) => {
            this.updateBook = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error.message)
          }
        )
      }
    )
  }

  ngOnInit(): void {
    this.getAuthors();
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

  onUpdateBook(editForm: NgForm): void{

    let book: Book = {
      id: editForm.value.id,
      name: editForm.value.name,
      description: editForm.value.description,
      author: {
        id: editForm.value.authorId,
      }
    }
    this.bookService.updateBook(book).subscribe(
      (response: Book) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
}
