import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { HandlerError } from "../models/handleError";
import { Book } from "../models/book.model";
import { Reader } from "../models/reader.model";
import { catchError, Observable, of, throwError } from "rxjs";
import { DataService } from "./data.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class DataResolverService implements Resolve<Book[] | Reader[]>{
    constructor(private dataService: DataService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book[] | Reader[] | Observable<Book[] | Reader[]> | Promise<Book[] | Reader[]> {
        return this.dataService
            .getAllBooks()
            .pipe(
                catchError(
                    (error: HttpErrorResponse) => 
                    {
                        const dataError = new HandlerError();
                        dataError.errorNumber = 103;
                        dataError.message = error.statusText;
                        dataError.friendlyMessage = "error 103";
                        return throwError(error);
                    })
            );
    }
}