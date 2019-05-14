import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneyExchangeAPIService {

  constructor(private httpClient: HttpClient) { }

  InvokeGetMethod(serviceUrl, serviceHeaders ){

    const headers = new HttpHeaders(
      serviceHeaders
    );

    return this.httpClient.get<any>(serviceUrl, {headers});

  }
}
