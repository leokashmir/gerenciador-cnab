import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
import {PesquisaService} from "./services/pesquisa.service";
import {Transacoesdto} from "./models/transacoesdto";
>>>>>>> e7fac0381a059ceaba2e8455c38e5ed99ce6e144

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) { };

  redirectToRoute(route: string): void {
    this.router.navigate([route]);
  }
  title = 'Gerenciador de Arquivos CNAB';

<<<<<<< HEAD
  items = [
    { title: 'Upload de Arquivos', link: 'upload' },
    { title: 'Consultar Transações', link: 'pesquisa' },
  ];
=======

  constructor() {

  }



>>>>>>> e7fac0381a059ceaba2e8455c38e5ed99ce6e144
}
