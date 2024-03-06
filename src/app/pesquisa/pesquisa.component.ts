import {Component, OnInit, ViewChild} from '@angular/core';
import {PesquisaService} from "../services/pesquisa.service";
import {TransacoesModel} from "../models/transacoes.model";
import {PesquisaFiltroBuilder} from "../models/pesquisaFiltroModel";
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  debugger
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
        debugger
        this.dataSource = data;
        this.exibirTabela = true;
        //SE NAO CONECTAR, CHAMA UM MOCK PARA TESTES
      },error: (err: any) => {
            this.erroMensagem = err;
            console.log("=======UTILIZANDO======= MOCK==============");
            this.dataSource = new MatTableDataSource<TransacoesModel>(this.listaTetste());
            this.exibirTabela = true;

      }, complete: () => { this.spinner.hide(); },

    })
  }

  createForm() {
    this.formControlPesquisa = this.formBuilder.group({
      companyName: new FormControl (this.companyName),
      companyId: new FormControl (this.companyId),
      accountOrigin: new FormControl (this.accountOrigin),
      accountDestination: new FormControl (this.accountDestination),
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

//============================================= MOCK ====================================

  listaTetste(){
debugger
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
// ================================== Mock ====================================
