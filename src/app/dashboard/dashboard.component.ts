import { Component, Input, OnInit, OnChanges, AfterContentChecked, AfterViewChecked } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../core/data.service";
import { Book } from "../models/book.model";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnChanges, AfterContentChecked, AfterViewChecked{
    @Input()allBooks?: Book[];
    allReaders?: Reader[];
    mostPopularBookTitle?: string;

    constructor(private dataService: DataService, private router: ActivatedRoute){}

    ngOnInit(): void {
        this.getAllBooks();
        this.getAllReaders();
        this.mostPopularBookTitle = this.dataService.mostPopularBookTitle; 
    }

    ngOnChanges(): void {
        // console.log("ngOnChanges", this.allBooks);
    }

    ngAfterContentChecked(): void {
        // console.log("ngAfterContentChecked", "1");
        // this.getAllBooks();
    }

    ngAfterViewChecked(): void {
        // console.log("ngAfterViewChecked", "2");
    }

    deleteBook(bookID: number): void{
        this.dataService
            .deleteBook(bookID)
            .subscribe(
                (books: Book[]) => {
                    // const deleteBookIndex = this.allBooks?.findIndex(item => item.bookID === bookID);
                    // if(deleteBookIndex as number){
                    //     this.allBooks?.splice(<number>deleteBookIndex, 1);
                    //     console.log("Delete: ", "SUCCESS");
                    // }else console.log("Delete", "SUCCESS Too");
                    this.allBooks = books;
                    console.log("Delete Succesfully", books);
                },
                (err: HandlerError) => console.error(err)
            );
    }

    deleteReader(readerID: number): void{
        this.dataService
            .deleteReader(readerID)
            .subscribe(
                (readers: Reader[]) => {
                    console.log(readers);
                    this.allReaders = readers;
                },
                (err: HandlerError) => console.error(err)
            );
    }

    private getAllBooks(): void{
        // try {
        //     const resolvedData: Book[] = this.router.snapshot.data["resolvedData"];
        //     this.allBooks = resolvedData;    
        //     console.log("data", resolvedData);        
        // } catch (error) {
        //     console.error(error);
        // }
        this.dataService
            .getAllBooks()
            .subscribe(
                (books: Book[]) => this.allBooks = books,
                (error: HandlerError) => console.error(error)
            );
    }

    private getAllReaders(): void{
        this.dataService
            .getAllReaders()
            .subscribe(
                (readers: Reader[]) => this.allReaders = readers,
                (err: HandlerError) => console.error(err)
            )
    }
}