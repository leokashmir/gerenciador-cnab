import {Component} from '@angular/core';
import {UploadService} from "../services/upload.service";
import {ResponseUpload} from "../models/responseupload";
import {ResponseErroUpload} from "../models/responseerroupload";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.css'
})
export class UploadfileComponent {

  currentFile?: File;
  message!:string;
  responseSucesso!: ResponseUpload;
  responseErro!:ResponseErroUpload;

  constructor(private uploadService: UploadService) {

  }


  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
              this.responseSucesso = event;
              this.message = event.message;
              console.log(event.status)

        },
        error: (err: any) => {
          if(err.status == 400){
            this.responseErro = err.error;
          }else{
            this.message = err.message;
          }
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }


}
