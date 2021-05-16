import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {AuthorService} from '../../service/author.service';
import {Author} from '../../model/author';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  authors: Author[]

  updateBook: Book = {}

  bookId: number;

  constructor(private bookService: BookService,
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.bookId = + paramMap.get('id');
        bookService.getBookById(this.bookId).subscribe(
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
    console.log(editForm.value.authorId);
    console.log(typeof editForm.value.authorId);
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
        console.log(response);
        this.toastr.success("Update Book Successful !")
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error("Failed ! Please Try Again")
      }
    )
  }
}
