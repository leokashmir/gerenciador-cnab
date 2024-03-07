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
  fileName = 'Selecione o Arquivo';
  message!: string;
  messageErro!: string;
  responseSucesso!: ResponseUpload;
  responseError: ResponseErroUpload;
  displayedColumns: string[] = ['Conta de Origem', 'Conta de Destino', 'Tipo de Transação', 'Valor'];
  displayedColumnsErros: string[] = ['Linha', 'Error'];
  dataSource: TransacoesModel[] = [];
  dataSourceErros: ErrosModel[] = []
  transacoes$: Observable<ResponseUpload>;
  flagExibir: boolean = true;


  constructor(private uploadService: UploadService, private spinner: NgxSpinnerService) {
    this.responseError = new ResponseErroUpload();
    this.transacoes$ = new Observable<ResponseUpload>();
  }


  selectFile(event: any): void {

    this.currentFile = event.target.files.item(0);
    this.fileName = (event.target.files.item(0).name)
      ? event.target.files.item(0).name
      : this.fileName;
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
          this.currentFile = undefined;
          this.spinner.hide();

        },
        error: (err: any) => {
          this.dataSource = [];
          
          if (err.status == 400) {
            this.responseError = err.error;
            this.messageErro = this.responseError.message;

            if (this.responseError.erros != undefined) {
              this.dataSourceErros = this.responseError.erros
              this.flagExibir = false;
            }else{
              this.dataSourceErros = []
              this.flagExibir = true;
              this.messageErro = this.responseError.message;
            }


          } else {
            this.dataSourceErros = []
            this.flagExibir = true;
            this.messageErro = err.message;
          }
          this.currentFile = undefined;
          this.spinner.hide();
        }
      });


      setTimeout(() => {
        this.message = '';
        this.messageErro = '';
      }, 6000);
    }
  }

  getType(type: string) {
    if (type == 'C') {
      return TipoEnum.C
    }
    if (type == 'D') {
      return TipoEnum.D
    }
    if (type == 'T') {
      return TipoEnum.T
    }
    return
  }
}
