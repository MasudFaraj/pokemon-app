import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) {
  }
  getPokemon(nameOrId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/${nameOrId}`);
    //return this.http.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  }
}
