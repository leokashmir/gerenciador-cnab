import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {ResponseUpload} from "../models/responseupload";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private httpClient : HttpClient;
  private urlBase = Environment.URL_BASE;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const url = this.urlBase + '/file/upload';

    return this.httpClient.post<any>(url, formData , {  responseType: 'json'})
  }

}
