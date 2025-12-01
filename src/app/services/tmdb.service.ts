import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = environment.apiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        page: page.toString()
      }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        language: 'pt-BR',
        query,
        page: page.toString()
      }
    });
  }
}
