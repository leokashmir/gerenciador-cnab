import { Component } from '@angular/core';
import {PesquisaService} from "./services/pesquisa.service";
import {Transacoesdto} from "./models/transacoesdto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gerenciador de Arquivos CNAB';


  constructor() {

  }



}
