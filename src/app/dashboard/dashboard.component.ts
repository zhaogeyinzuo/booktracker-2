import { Component, OnInit } from "@angular/core";
import { DataService } from "../core/data.service";
import { Book } from "../models/book.model";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit{
    allBooks?: Book[];
    allReaders?: Reader[];
    mostPopularBook?: Book;

    constructor(private dataService: DataService){}

    ngOnInit(): void {
        this.getAllBooks();
    }

    handleDelete(): void{

    }

    private getAllBooks(): void{
        this.dataService
            .getAllBooks()
            .subscribe(
                (books: Book[] | HandlerError) => {
                    if(books as Book[])this.allBooks = <Book[]>books;
                },
                (error: any) => console.log(error)
            );
    }
}