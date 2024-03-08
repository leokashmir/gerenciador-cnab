import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {TransacoesModel} from "../models/transacoes.model";
import {isEmpty, Observable} from "rxjs";
import {PesquisaFiltroModel} from "../models/pesquisaFiltroModel";

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  private httpClient: HttpClient;
  private urlBase = Environment.URL_BASE;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  getTransacoes(pageNumber: number, pageSize: number, filtro: PesquisaFiltroModel): Observable<TransacoesModel[]> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

      if (filtro.accountOrigin !== 'undefined' && filtro.accountOrigin != null) {
        headers = headers.set('accountOrigin', filtro.accountOrigin);
      }
      if (filtro.accountDestination !== 'undefined' && filtro.accountDestination != null ) {
        headers = headers.set('accountDestination', filtro.accountDestination);
      }
      if (filtro.companyId !== 'undefined' && filtro.companyId != null ) {
        headers = headers.set('companyId', filtro.companyId);
      }
      if (filtro.companyName !== 'undefined' && filtro.companyName != null) {
        headers = headers.set('companyName', filtro.companyName);
      }
      if (filtro.type !== 'undefined' && filtro.type != null )  {
        headers = headers.set('type', filtro.type);
      }

    return this.httpClient.get<any>(this.urlBase + "/transactions/find?pageNumber=" + pageNumber + "&pageSize=" + pageSize, {headers})
  }
}
