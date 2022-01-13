import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../core/data.service";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Component({
    selector: "edit-reader",
    templateUrl: "./edit-reader.component.html",
    styleUrls: ["./edit-reader.component.scss"]
})
export class EditReaderComponent implements OnInit{
    selectedReader?: Reader;

    constructor(private dataService: DataService, private router: ActivatedRoute,public location: Location){}

    ngOnInit(): void {
        const readerId: number = this.router.snapshot.params["id"];
        this.dataService
            .getReaderById(readerId)
            .subscribe(
                (reader: Reader) => this.selectedReader = reader,
                (err: HandlerError) => console.error(err)
            );
    }

    saveChanges(): void{
        this.dataService
            .updateReader(<Reader>this.selectedReader)
            .subscribe(
                (reader: Reader) => console.log("update successfully", reader),
                (error: HandlerError) => console.error(error)
            )
    }
}