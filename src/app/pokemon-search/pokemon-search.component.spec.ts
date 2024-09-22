import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonSearchComponent } from './pokemon-search.component';
import { PokemonService } from '../pokemon.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('PokemonSearchComponent', () => {   // alle tests werden hier gruppiert
  let component: PokemonSearchComponent;
  //Wird verwendet, um die Komponente und ihren DOM (Document Object Model) zu erstellen.
  // Es bietet Zugriff auf das gerenderte HTML und die zugrunde liegende Komponente.
  let fixture: ComponentFixture<PokemonSearchComponent>;
  //Eine simulierte (Mock) Version des PokemonService, die in Tests verwendet wird.Es wird mit Jasmine erstellt, um den echten Service durch einen Test-Double zu ersetzen.
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    // Initialisiert das Mock-Objekt 'PokemonService' mit einer spy-Methode `getPokemon`.

    await TestBed.configureTestingModule({   //  initialisiert das Testmodul
      imports: [ReactiveFormsModule],
      declarations: [PokemonSearchComponent],  // Registriert die zu testende Komponente.
      //Ersetzt den echten PokemonService durch das zuvor erstellte mockPokemonService.
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
    }).compileComponents(); // Kompiliert die Komponenten-Vorlagen und -Stile für die Tests.

    fixture = TestBed.createComponent(PokemonSearchComponent);  //erstellt eine Instanz der Komponente und ihres DOM.
    component = fixture.componentInstance;  //Greift auf die Instanz der Komponente zu.
    fixture.detectChanges(); //Führt den Initialisierungszyklus der Komponente aus (z.B. OnInit), um sicherzustellen, dass die Komponente vollständig eingerichtet ist, bevor die Tests beginnen.
  });

  it('should create the component', () => {  //it: Definiert einen einzelnen Test. Dieser Test überprüft, 
    //ob die PokemonSearchComponent korrekt erstellt wurde (ob die Komponente existiert).
    expect(component).toBeTruthy();
  });
  it('should initialize the search form', () => { //Dieser Test überprüft, ob das Suchformular korrekt initialisiert wurde und das Steuerelement search existiert.
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm.controls['search']).toBeTruthy();
  });
  //Teste das erfolgreiche Suchen eines Pokémon:
  it('should display a loading indicator and call PokemonService on form submit', () => {
    const pokemonMockData = { name: 'Pikachu', id: 25 };  // Mock Pokemon data
    mockPokemonService.getPokemon.and.returnValue(of(pokemonMockData));  //Simuliert das Verhalten der Methode getPokemon, sodass sie einen Observable (mit den Daten von Pikachu) zurückgibt.
    component.searchForm.controls['search'].setValue('Pikachu');
    component.onSubmit();
    expect(component.loading).toBeTrue();
    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('pikachu');  //Überprüft, ob der getPokemon-Service mit dem Wert "pikachu" aufgerufen wurde.
  });
  //Teste die Fehlerbehandlung bei einer fehlgeschlagenen Suche:
  it('should display an error message when no Pokemon is found', () => {
    mockPokemonService.getPokemon.and.returnValue(throwError(() => new Error('No Pokemon found')));
    component.searchForm.controls['search'].setValue('Unknown');
    component.onSubmit();
    expect(component.errorMessage).toBe('No pokemon found');
    expect(component.loading).toBeFalse();
  });
});
