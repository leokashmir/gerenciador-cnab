import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  items = [
    { title: 'Upload de Arquivos', link: 'upload' },
    { title: 'Consultar Transações', link: 'pesquisa' },
  ];
}
