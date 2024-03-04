import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private httpClient : HttpClient;
  private urlBase = Environment.URL_BASE;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    this.httpClient.post(`${this.urlBase}/file/upload`, formData , {  responseType: 'json'})
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      });

  }

}
