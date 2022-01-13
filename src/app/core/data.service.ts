import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Book } from "../models/book.model";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Injectable()
export class DataService {
    mostPopularBookTitle?: string;

    constructor(private http: HttpClient) { }

    getAllBooks(): Observable<Book[]> {
        return this.http
            .get<Book[]>("/api/books")
            .pipe(
                catchError((err) => {
                    const dataError = new HandlerError();
                    dataError.errorNumber = 100;
                    dataError.message = err.statusText;
                    dataError.friendlyMessage = "An error occurred retrieving data.";
                    return throwError(dataError);
                })
            );
    }

    addBook(book: Book): Observable<Book> {
        return this.http.post<Book>("/api/books", book);
    }

    getBookById(bookId: number): Observable<Book>{
        return this.http.get<Book>(`/api/books/${bookId}`);
    }

    updateBook(book: Book): Observable<Book>{
        return this.http
            .put<Book>(`/api/books/${book.bookID}`, book)
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        const dataError = new HandlerError();
                        dataError.errorNumber = 110;
                        dataError.message = error.statusText;
                        dataError.friendlyMessage = "An error occurred updating info of a book.";
                        return throwError(dataError);
                    }
                )
            );
    }

    deleteBook(bookId: number): Observable<Book[]>{
        return this.http
            .delete<Book[]>(`/api/books/${bookId}`)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    const dataError = new HandlerError();
                    dataError.errorNumber = 102;
                    dataError.message = err.statusText;
                    dataError.friendlyMessage = "An error is occurred deleting info of a book.";
                    return throwError(dataError);
                })
            );
    }

    setMostPopularBook(title: string | undefined){
        if(title)this.mostPopularBookTitle = title;
        else {}
    }

    getAllReaders(): Observable<Reader[]> {
        return this.http
            .get<Reader[]>("/api/readers")
            .pipe(
                catchError((error: HttpErrorResponse) => 
                    this.handleHttpError(error, 105, "An error occurred retrieving info of readers."))
            );
    }

    addReader(reader: Reader): Observable<Reader>{
        return this.http
            .post<Reader>("/api/readers", reader)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                    this.handleHttpError(error, 101, "An error occurred adding a reader."))
            );
    }

    getReaderById(readerID: number): Observable<Reader>{
        return this.http
            .get<Reader>(`/api/readers/${readerID}`)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                    this.handleHttpError(error, 100, "An error occurred retrieving info of a reader."))
            );
    }

    updateReader(reader: Reader): Observable<Reader>{
        return this.http
            .put<Reader>(`api/readers/${reader.readerID}`, reader)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                    this.handleHttpError(error, 103, "An error occurred updating info of a reader."))
            );
    }

    deleteReader(readerId: number): Observable<Reader[]>{
        return this.http
            .delete<Reader[]>(`/api/readers/${readerId}`)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                this.handleHttpError(error, 104, "An error occurred deleting info of a reader."))
            );
    }

    private handleHttpError(error: HttpErrorResponse, errorNumber: number ,msg: string): Observable<any> {
        const dataError = new HandlerError();
        dataError.errorNumber = errorNumber;
        dataError.message = error.statusText;
        dataError.friendlyMessage = msg;
        return throwError(dataError);
    }
}