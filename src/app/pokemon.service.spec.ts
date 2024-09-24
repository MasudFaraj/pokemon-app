import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide the HttpClient and mock the HTTP requests using provideHttpClientTesting
      providers: [PokemonService, provideHttpClientTesting()],  // Standalone testing setup
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve a Pokemon by id', () => {
    const mockPokemon = { name: 'Pikachu', id: 25 };
    service.getPokemon('25').subscribe(pokemon => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne('api/pokemon/25');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);  // Simulate a server response with mock data
  });
  it('should retrieve a Pokemon by name', () => {
    const mockPokemon = { name: 'pikachu', id: 25 };
    service.getPokemon('pikachu').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon); //is used to simulate a server response, allowing you to control the behavior of HTTP requests during testing.
  });

  it('should handle an error when Pokemon is not found', () => {
    service.getPokemon('unknown').subscribe(
      () => fail('expected an error, not Pokemon'),
      (error) => expect(error.message).toContain('404')
    );
    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/unknown`);
    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });
  });
});
