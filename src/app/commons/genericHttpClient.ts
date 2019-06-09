import {HttpClient} from '@angular/common/http';

export class GenericHttpClient<TEntity, TId> {
  constructor(protected httpClient: HttpClient, public _url: string) {}

  findById(id: TId) {
    return this.httpClient.get<TEntity>(this._url + '/' + id);
  }

  list(queryParams?: any) {
    return this.httpClient.get<TEntity[]>(this._url, {params: queryParams});
  }

  add(model) {
    return this.httpClient.post<TEntity>(this._url, model);
  }

  delete(id: number) {
    return this.httpClient.delete(this._url + '/' + id);
  }

}
