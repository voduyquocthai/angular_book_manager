import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book.service';
import {AuthorService} from '../../service/author.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book = {}

  bookId: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.bookId = + paramMap.get('id');
        bookService.getBookById(this.bookId).subscribe(
          (response: Book) => {
            this.book = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error.message)
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }

}
