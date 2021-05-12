import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent} from './book/book-list/book-list.component';
import {CreateBookComponent} from './book/create-book/create-book.component';
import {UpdateBookComponent} from './book/update-book/update-book.component';


const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'books/create', component: CreateBookComponent},
  {path: 'books/update/:id', component: UpdateBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
