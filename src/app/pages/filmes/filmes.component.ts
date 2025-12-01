import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FilmesListaService } from '../../services/filmes-lista.service';
import { PesquisaService } from '../../services/pesquisa.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmes',
  imports: [CommonModule],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  filmes: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  totalPages = 0;

  constructor(
    private tmdbService: TmdbService,
    private listaService: FilmesListaService,
    private pesquisaService: PesquisaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.buscarFilmes(this.currentPage);
  }

  buscarFilmes(page: number = 1) {
    if (this.searchTerm.trim()) {
      this.tmdbService.searchMovies(this.searchTerm, page).subscribe({
        next: (res: any) => {
          this.filmes = res.results;
          this.totalPages = res.total_pages;
          this.currentPage = page;
        },
        error: (err) => console.error(err)
      });
    } else {
      this.tmdbService.getPopularMovies(page).subscribe({
        next: (res: any) => {
          this.filmes = res.results;
          this.totalPages = res.total_pages;
          this.currentPage = page;
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.buscarFilmes(1);
  }

  isAssistido(filme: any): boolean {
    return this.listaService.isAssistido(filme.id);
  }

  isQueroAssistir(filme: any): boolean {
    return this.listaService.isQueroAssistir(filme.id);
  }

  adicionarAssistidos(filme: any) {
    this.listaService.adicionarAssistido(filme);
  }

  adicionarQueroAssistir(filme: any) {
    this.listaService.adicionarQueroAssistir(filme);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.buscarFilmes(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.buscarFilmes(this.currentPage - 1);
    }
  }

  showOverlay(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.opacity = '1';
    }
  }

  hideOverlay(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.opacity = '0';
    }
  }
}
