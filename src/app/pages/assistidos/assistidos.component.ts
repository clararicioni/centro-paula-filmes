import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmesListaService } from '../../services/filmes-lista.service';

@Component({
  selector: 'app-assistidos',
  imports: [CommonModule],
  templateUrl: './assistidos.component.html',
  styleUrl: './assistidos.component.css'
})
export class AssistidosComponent implements OnInit {
  assistidos: any[] = [];

  constructor(private listaService: FilmesListaService) { }

  ngOnInit() {
    this.assistidos = this.listaService.getAssistidos();
  }
  
  avaliar(filme: any, estrelas: number) {
    this.listaService.avaliarFilme(filme, estrelas);
    this.assistidos = this.listaService.getAssistidos(); 
  }

  removerAssistido(filme: any) {
    this.listaService.removerAssistido(filme);
    this.assistidos = this.listaService.getAssistidos();
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
