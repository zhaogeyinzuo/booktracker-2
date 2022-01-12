import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../models/book.model";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Injectable()
export class DataService{
    constructor(private http: HttpClient){}

    getAllBooks(): Observable<Book[] | HandlerError>{
        return this.http.get<Book[] | HandlerError>("/api/books");
    }

    addBook(book: Book): Observable<Book>{
        return this.http.post<Book>("/api/books", book);
    }

    getAllReaders(): Observable<Reader[] | HandlerError>{
        return this.http.get<Reader[] | HandlerError>("/api/readers");
    }
}