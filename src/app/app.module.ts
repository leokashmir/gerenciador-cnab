import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UploadfileComponent} from './uploadfile/uploadfile.component';
import {PesquisaComponent} from './pesquisa/pesquisa.component';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PesquisaFiltroBuilder} from "./models/pesquisaFiltro";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTable, MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    UploadfileComponent,
    PesquisaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatIcon,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginator,
    MatTable,
    MatPaginatorModule,
    MatTableModule,

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    PesquisaFiltroBuilder,
    provideAnimationsAsync(),



  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
