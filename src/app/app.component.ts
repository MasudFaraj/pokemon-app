import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {PokemonSearchComponent} from "./pokemon-search/pokemon-search.component";
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PokemonSearchComponent, PokemonDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 title = 'pokemon-ang-app';
}
