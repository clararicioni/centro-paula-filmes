import { Component } from '@angular/core';
import { FilmesListaService } from '../../services/filmes-lista.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avaliados',
  imports: [CommonModule],
  templateUrl: './avaliados.component.html',
  styleUrl: './avaliados.component.css'
})
export class AvaliadosComponent {
  avaliados: any[] = [];

  constructor(private listaService: FilmesListaService, public router: Router) { }

  ngOnInit() {
    this.avaliados = this.listaService.getAvaliados();
  }

  removerAvaliado(filme: any) {
    this.listaService.removerAvaliados(filme);
    this.avaliados = this.listaService.getAvaliados();
  }

  editarAvaliacao(filme: any, novaNota: number) {
    this.listaService.atualizarAvaliacao(filme, novaNota);
    this.avaliados = this.listaService.getAvaliados();
  }
}
