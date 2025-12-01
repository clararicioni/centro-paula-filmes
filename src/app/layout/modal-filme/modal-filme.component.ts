import { Component } from '@angular/core';
import { PesquisaService } from '../../services/pesquisa.service';
import { CommonModule } from '@angular/common';
import { FilmesListaService } from '../../services/filmes-lista.service';

@Component({
  selector: 'app-modal-filme',
  templateUrl: './modal-filme.component.html',
  imports: [CommonModule],
  styleUrls: ['./modal-filme.component.css']
})
export class ModalFilmeComponent {
  filme: any = null;

  constructor(private pesquisaService: PesquisaService, private listaService: FilmesListaService,) {
    this.pesquisaService.filmeSelecionado$.subscribe(filme => {
      this.filme = filme;
    });
  }

  fechar() {
    this.pesquisaService.fecharModal();
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
}
