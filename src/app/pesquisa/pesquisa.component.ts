import {Component} from '@angular/core';
import {PesquisaService} from "../services/pesquisa.service";
import {Transacoesdto} from "../models/transacoesdto";
import {PesquisaFiltro} from "../models/pesquisaFiltro";

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {

  transacoes: Transacoesdto[] = [];
  colors = ["Red", "Blue", "White"]
  teste!: Transacoesdto;
  filtro!: PesquisaFiltro;

  constructor(private pesquisa: PesquisaService) {
    console.log("Pesquisa === ")
    this.testeTabela();
  }


  testeTabela() {
    this.teste.accountOrigin = "12313";
    this.teste.accountDestination = "12313";
    this.teste.value = 123.12;
    this.transacoes.push(this.teste)
  }


  pesquisaTransacaoes() {
    this.pesquisa.getTransacoes(1, 5, this.filtro).subscribe(
      trans => trans.forEach(d =>
        console.log(d.company.companyName + " - " + d.accountOrigin))
    )
  }

}
