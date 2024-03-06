import {Component, OnInit, ViewChild} from '@angular/core';
import {PesquisaService} from "../services/pesquisa.service";
import {TransacoesModel} from "../models/transacoes.model";
import {PesquisaFiltroBuilder} from "../models/pesquisaFiltroModel";
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {type} from "node:os";
import {TipoEnum} from "../enums/TiposEnum";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent implements OnInit{

  transacoes$ = new Observable<TransacoesModel[]>();
  companyName!: string;
  companyId!:string;
  accountOrigin!:string;
  accountDestination!:string
  message!: string
  type!:string;
  formControlPesquisa!: FormGroup;
  erroMensagem!:string;
  types =[
    {value: 'C', viewValue: 'CREDITO'},
    {value: 'D', viewValue: 'DEBITO'},
    {value: 'T', viewValue: 'TRANSFERENCIA'},
  ]
  displayedColumns: string[] = ['Empresa', 'Cnpj', 'Conta de Origem', 'Conta de Destino', 'Tipo de Transação', 'Valor'];
  exibirTabela:boolean = false;

  dataSource = new MatTableDataSource<TransacoesModel>()
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  constructor(
    private pesquisa: PesquisaService,
    private filtroBuilder: PesquisaFiltroBuilder,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  pesquisarTransacaoes() {

    this.spinner.show();
    const filter = this.filtroBuilder
      .setName(this.formControlPesquisa.get("companyName")?.value)
      .setAccountDestination(this.formControlPesquisa.get("accountDestination")?.value)
      .setAccountOrigin(this.formControlPesquisa.get("accountOrigin")?.value)
      .setCompanyId(this.formControlPesquisa.get("companyId")?.value)
      .setType(this.formControlPesquisa.get("type")?.value).build();

    this.transacoes$ = this.pesquisa.getTransacoes(0, 10, filter)
    this.transacoes$.subscribe({
      next: (data: any) => {
        if(data.length == 0){
          this.message = "Não há registros para a busca executada."
          this.dataSource = new MatTableDataSource<TransacoesModel>()  ;
        }else{
          this.dataSource = data;
          this.exibirTabela = true;
        }



      },error: (err: any) => {
            this.erroMensagem = err;
            //Habiitar para relizar um teste quando nao houver conexão com o back-end
            // this.dataSource = new MatTableDataSource<TransacoesModel>(this.listaMock());
            // this.exibirTabela = true;

      }, complete: () => { this.spinner.hide(); },

    })
  }

  createForm() {
    this.formControlPesquisa = this.formBuilder.group({
      companyName: new FormControl (this.companyName, Validators.maxLength(30)),
      companyId: new FormControl (this.companyId, [ Validators.pattern("^\\d{14}$")]),
      accountOrigin: new FormControl (this.accountOrigin, [ Validators.pattern("^(?!0+$)\\d{1,16}$")]),
      accountDestination: new FormControl (this.accountDestination, [ Validators.pattern("^(?!0+$)\\d{1,16}$")]),
      type: new FormControl (this.type)
    })
  }

  limpar(){
  debugger
    this.dataSource = new MatTableDataSource<TransacoesModel>()
    this.exibirTabela = false;
    this.formControlPesquisa.reset()

  }

  getType(type : string){
    if(type == 'C'){ return TipoEnum.C}
    if(type == 'D') {return TipoEnum.D}
    if(type == 'T') {return TipoEnum.T}
    return
  }

//============================================= MOCK ==================================================================

  listaMock(){
     var comp :Company  = new Company("Empresa B", "12354689000123" )
     var tran : Transacoes = new Transacoes("123","321",comp,"C",123.23 )
     var lista: Transacoes[] = [];
     lista.push(tran);
     lista.push(tran);
     return lista;
  }
}

export class Transacoes implements TransacoesModel{
  accountDestination: string;
  accountOrigin: string;
  company: Company;
  type: string;
  value: number;


  constructor(accountDestination: string, accountOrigin: string, company: Company, type: string, value: number) {
    this.accountDestination = accountDestination;
    this.accountOrigin = accountOrigin;
    this.company = company;
    this.type = type;
    this.value = value;
  }
}

export class Company  {

  companyName: string;
  companyId: string;


  constructor(companyName: string, companyId: string) {
    this.companyName = companyName;
    this.companyId = companyId;
  }
}
// ================================== Mock ============================================================================
