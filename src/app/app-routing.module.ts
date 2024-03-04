import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


const routes: Routes = [
  { path: 'upload', component: UploadfileComponent },
  { path: 'pesquisa', component: PesquisaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
