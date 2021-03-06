import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  deleteBook: Book = {};

  constructor(private bookService: BookService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }


  onOpenDeleteModal(book: Book): void {
    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.deleteBook = book;
    button.setAttribute('data-target', '#deleteBookModal')
    container?.appendChild(button);
    button.click();
  }

  onDeleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      (response: void) => {
        this.toastr.success("Delete Book Successful !")
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        this.toastr.error("Failed ! Please Try Again")
      }
    )
  }
}
