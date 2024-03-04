import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadfileComponent,
    PesquisaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
