import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { DataService } from "../core/data.service";
import { Book } from "../models/book.model";

@Component({
    selector: "add-book",
    templateUrl: "./add-book.component.html",
    styleUrls: ["./add-book.component.scss"]
})
export class AddBookComponent{
    constructor(private dataService: DataService, public location: Location){}
    
    saveBook(book: any){
        if(book as Book){
            book.bookID = 0;
            this.dataService
                .addBook(<Book>book)
                .subscribe(
                    (book: Book) => console.log("Added new book: ", book),
                    (err: any) => console.error(err)
            );
        }
    }
}