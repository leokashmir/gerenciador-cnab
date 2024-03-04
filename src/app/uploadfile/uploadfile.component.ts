import { Component } from '@angular/core';
import {UploadService} from "../services/upload.service";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.css'
})
export class UploadfileComponent {

  currentFile?: File;
  message:string;

  constructor(private uploadService: UploadService) {
    this.message="TESTE";
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      console.log("OK");
    }
  }


}
