import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {NgIf} from "@angular/common";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgIf, CommonModule
  ],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent {
  searchForm : FormGroup;
  pokemon: any;
  loading : boolean = false;
  errorMessage : string | null = null;

  constructor(private pokemonService: PokemonService, private fb :FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    })
  }
  onSubmit() {
    const searchValue = this.searchForm.value.search.toLowerCase();
    console.log('Searching for:', searchValue);  // Log den Suchbegriff

    //const searchValue = this.searchForm.controls['search'].value.toLowerCase();
    if (searchValue) {
      this.loading = true;
      this.errorMessage = null;
      this.pokemonService.getPokemon(searchValue).subscribe({
        next: (result) => {
          console.log('Pokemon data:', result);  // Log die erhaltenen Daten
          this.pokemon = result;
          this.loading = false;
        }, error:(error) => {
          console.error('Error occurred:', error);  // Log den Fehler
          this.errorMessage = 'No pokemon found';
          this.loading = false;
        }
      })
    }
  }

}
