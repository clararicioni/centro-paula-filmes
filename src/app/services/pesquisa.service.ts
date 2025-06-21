import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private filmeSelecionadoSubject = new BehaviorSubject<any>(null);
  filmeSelecionado$ = this.filmeSelecionadoSubject.asObservable();

  selecionarFilme(filme: any) {
    this.filmeSelecionadoSubject.next(filme);
  }

  fecharModal() {
    this.filmeSelecionadoSubject.next(null);
  }
}
