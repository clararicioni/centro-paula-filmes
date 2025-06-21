import { Component, OnInit } from '@angular/core';
import { FilmesListaService } from '../../services/filmes-lista.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assistir',
  imports: [CommonModule],
  templateUrl: './assistir.component.html',
  styleUrl: './assistir.component.css'
})
export class AssistirComponent implements OnInit{
  queroAssistir: any[] = [];

  constructor(private listaService: FilmesListaService) {}

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.queroAssistir = this.listaService.getQueroAssistir() || [];
  }

  moverParaAssistidos(filme: any): void {
    this.listaService.adicionarAssistido(filme);
    this.listaService.removerQueroAssistir(filme);
    this.atualizarLista();
  }

  removerQueroAssistir(filme: any): void {
    this.listaService.removerQueroAssistir(filme);
    this.atualizarLista();
  }

  showOverlay(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (target) target.style.opacity = '1';
  }

  hideOverlay(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    if (target) target.style.opacity = '0';
  }
}
