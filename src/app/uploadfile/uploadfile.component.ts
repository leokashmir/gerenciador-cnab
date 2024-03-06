import {Component} from '@angular/core';
import {UploadService} from "../services/upload.service";
import {ResponseUpload} from "../models/responseupload";
import {ResponseErroUpload} from "../models/responseerroupload";
import {MatTableDataSource} from "@angular/material/table";
import {TransacoesModel} from "../models/transacoes.model";
import {ConfirmacaoUploadModel} from "../models/confirmacao.upload.model";
import {Observable} from "rxjs";
import {TipoEnum} from "../enums/TiposEnum";
import {ErrosModel} from "../models/erros.model";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.css'
})
export class UploadfileComponent {


  currentFile?: File;
  fileName = 'Select File';
  message!:string;
  messageErro!: string;
  progress = 0;
  protected readonly TipoEnum = TipoEnum;
  responseSucesso!: ResponseUpload;
  displayedColumns: string[] = ['Conta de Origem', 'Conta de Destino', 'Tipo de Transação', 'Valor'];
  displayedColumnsErros: string[] = ['Linha', 'Error'];
  dataSource :TransacoesModel[] = [];
  dataSourceErros: ErrosModel[] = []
  transacoes$ = new Observable<ResponseUpload>();
  flagExibir: boolean = true;

  constructor(private uploadService: UploadService, private spinner: NgxSpinnerService) {

  }


  selectFile(event: any): void {

    this.currentFile = event.target.files.item(0);
    this.fileName =   (event.target.files.item(0).name)
      ?  event.target.files.item(0).name
      : this.fileName ;
  }

  upload(): void {

    this.message = '';
    this.messageErro = '';

    if (this.currentFile) {
      this.spinner.show();
      this.transacoes$ = this.uploadService.upload(this.currentFile);
      this.transacoes$.subscribe({
        next: (event: ResponseUpload) => {
          this.flagExibir = true;
              this.responseSucesso = event;
              this.dataSource = event.data.transactionDtos;
              this.message = event.message;
              console.log(event.status)

        },
        error: (err: any) => {
          this.flagExibir = false;
          if(err.status == 400){
            this.messageErro = err.error.message;
            this.dataSourceErros = err.error.erros;

          }else{
            this.messageErro = err.message;
          }
        },
        complete: () => {
          this.currentFile = undefined;
          this.spinner.hide();
        },
      });


      setTimeout(() => {
        this.message = '';
        this.messageErro = '';
      }, 6000);
    }
  }
  getType(type : string){
    if(type == 'C'){ return TipoEnum.C}
    if(type == 'D') {return TipoEnum.D}
    if(type == 'T') {return TipoEnum.T}
    return
  }
}
