import { Component } from '@angular/core';
import { PesquisaService } from '../../services/pesquisa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-filme',
  templateUrl: './modal-filme.component.html',
  imports: [CommonModule],
  styleUrls: ['./modal-filme.component.css']
})
export class ModalFilmeComponent {
  filme: any = null;

  constructor(private pesquisaService: PesquisaService) {
    this.pesquisaService.filmeSelecionado$.subscribe(filme => {
      this.filme = filme;
    });
  }

  fechar() {
    this.pesquisaService.fecharModal();
  }
}
