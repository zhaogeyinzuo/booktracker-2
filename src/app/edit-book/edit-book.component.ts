import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../core/data.service";
import { Book } from "../models/book.model";
import { HandlerError } from "../models/handleError";

@Component({
    selector: "edit-book",
    templateUrl: "./edit-book.component.html",
    styleUrls: ["./edit-book.component.scss"]
})
export class EditBookComponent implements OnInit{
    selectedBook?: Book;

    constructor(
        private dataService: DataService,
        private router: ActivatedRoute, 
        public location: Location
    ){}

    ngOnInit(): void {
        const bookId: number = this.router.snapshot.params["id"];
        this.dataService
            .getBookById(bookId)
            .subscribe(
                (book: Book) => {
                    if(book as Book)this.selectedBook = <Book>book;
                },
                (err: any) => console.error(err)
            );
    }

    saveChanges(){
        this.dataService
            .updateBook(<Book>this.selectedBook)
            .subscribe(
                () => console.log("updatedBook: ", "SUCCESS"),
                (err: HandlerError) => console.error(err) 
            );
    }

    setMostPupularBook(title: string | undefined){
        this.dataService.setMostPopularBook(title);
    }
}