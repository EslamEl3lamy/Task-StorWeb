import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _HttpClient: HttpClient) {}

  getTrending(): Observable<any> {
    return this._HttpClient.get(`https://test-api.storexweb.com/api/movies`);
  }

  getItemDetails(id: any): Observable<any> {
    return this._HttpClient.get(
      `https://test-api.storexweb.com/api/movies/${id}`
    );
  }

  createMovie(movie: any) {
    return this._HttpClient.post(
      `https://test-api.storexweb.com/api/movies`,
      movie
    );
  }

  updateMovie(id: any, movie: any) {
    return this._HttpClient.put(
      `https://test-api.storexweb.com/api/movies/${id}`,
      movie
    );
  }

  deleteMovie(id: any) {
    return this._HttpClient.delete(
      `https://test-api.storexweb.com/api/movies/${id}`
    );
  }
}
