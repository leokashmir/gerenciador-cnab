import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UploadfileComponent} from './uploadfile/uploadfile.component';
import {PesquisaComponent} from './pesquisa/pesquisa.component';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PesquisaFiltroBuilder} from "./models/pesquisaFiltroModel";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


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
    MatToolbar,
    MatProgressBar,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatProgressSpinner,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({type: 'square-jelly-box'})

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    PesquisaFiltroBuilder,
    provideAnimationsAsync(),


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
