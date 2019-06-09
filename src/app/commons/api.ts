import {HttpClient} from "@angular/common/http";

export abstract class Api<T> {

  constructor(protected httpClient: HttpClient) {}

  findById(id: number) {
    return this.httpClient.get<T>(this.url + "/" + id);
  }

  list(queryParams?: any) {
    return this.httpClient.get<T[]>(this.url, {params: queryParams});
  }

  listByParent(id: number, queryParams?: any) {
    // const url = String.Format(this.topUrl, id);
    const url = this.topUrl;
    console.log("TOP URL: " + url);
    return this.httpClient.get<T[]>(url, {params: queryParams});
  }

  stats<I>(queryParams?: any) {
    return this.httpClient.get<I>(`${this.url}/all/statistics`, {params: queryParams});
  }

  add(model) {
    return this.httpClient.post<T>(this.url, model);
  }

  addByParent(id, model) {
    // const url = String.Format(this.topUrl, id);
    const url = this.topUrl;
    return this.httpClient.post<T>(url, model);
  }

  create(model) {
    return this.httpClient.post<T>(this.url, model);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + "/" + id);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  statistics(id: number) {
    return this.httpClient.get<T>(`${this.url}/${id}/statistics`);
  }

  abstract get url();

  get topUrl(): string {
    return this.url;
  }

}

export const SERVER_URL = "http://localhost:7000/api";
