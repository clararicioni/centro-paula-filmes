import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PesquisaService } from '../../services/pesquisa.service';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  termo: string = '';
  sugestoes: any[] = [];
  private searchTerm$ = new Subject<string>();
  constructor(private tmdbService: TmdbService, private pesquisaService: PesquisaService, private router: Router) {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term ? this.tmdbService.searchMovies(term) : of([]))
      )
      .subscribe(results => {
        this.sugestoes = results.results || [];
      });
  }

  goToAssistidos(): void {
    this.router.navigate(['/assistidos']);
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.termo = input.value;
    this.searchTerm$.next(this.termo);
  }

  selecionarFilme(filme: any) {
    this.termo = filme.title;
    this.sugestoes = [];
    this.pesquisaService.selecionarFilme(filme); 
  }
}
