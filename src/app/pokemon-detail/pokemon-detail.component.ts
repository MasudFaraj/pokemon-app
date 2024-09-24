import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
@Input() pokemon:any;
// Pokemon-Daten werden von der übergeordneten Komponente übergeben
}
