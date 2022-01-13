import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { DataService } from "../core/data.service";
import { HandlerError } from "../models/handleError";
import { Reader } from "../models/reader.model";

@Component({
    selector: "add-reader",
    templateUrl: "./add-reader.component.html",
    styleUrls: ["./add-reader.component.scss"]
})
export class AddReaderComponent{
    constructor(private dataService: DataService, public location: Location){}

    saveReader(reader: Reader): void{
        this.dataService
            .addReader(reader)
            .subscribe(
                (reader: Reader) => {
                    if(reader as Reader)console.log("added successfully", reader);
                },
                (error: HandlerError) => console.error(error)
            );
    }
}