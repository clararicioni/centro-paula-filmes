import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmesListaService {
  private assistidosKey = 'assistidos';
  private avaliadosKey = 'avaliados';
  private avaliados: any[] = [];
  private queroAssistirKey = 'queroAssistir';

  getAssistidos(): any[] {
    return JSON.parse(localStorage.getItem(this.assistidosKey) || '[]');
  }

  getQueroAssistir(): any[] {
    return JSON.parse(localStorage.getItem(this.queroAssistirKey) || '[]');
  }

  adicionarAssistido(filme: any) {
    const assistidos = this.getAssistidos();
    if (!assistidos.find(f => f.id === filme.id)) {
      assistidos.push(filme);
      localStorage.setItem(this.assistidosKey, JSON.stringify(assistidos));
    }
  }

  removerAssistido(filme: any): void {
    const assistidos = this.getAssistidos();
    const atualizado = assistidos.filter(f => f.id !== filme.id);
    localStorage.setItem(this.assistidosKey, JSON.stringify(atualizado));
  }

  adicionarQueroAssistir(filme: any) {
    const quero = this.getQueroAssistir();
    if (!quero.find(f => f.id === filme.id)) {
      quero.push(filme);
      localStorage.setItem(this.queroAssistirKey, JSON.stringify(quero));
    }
  }

  removerQueroAssistir(filme: any): void {
    const quero = this.getQueroAssistir();
    const atualizado = quero.filter(f => f.id !== filme.id);
    localStorage.setItem(this.queroAssistirKey, JSON.stringify(atualizado));
  }

  isAssistido(id: number): boolean {
    return this.getAssistidos().some(f => f.id === id);
  }

  isQueroAssistir(id: number): boolean {
    return this.getQueroAssistir().some(f => f.id === id);
  }

  avaliarFilme(filme: any, nota: number): void {
    const assistidos = this.getAssistidos().filter(f => f.id !== filme.id);
    localStorage.setItem(this.assistidosKey, JSON.stringify(assistidos));

    let avaliados = this.getAvaliados();
    const filmeAvaliado = { ...filme, avaliacao: nota };
    avaliados = avaliados.filter(f => f.id !== filme.id);
    avaliados.push(filmeAvaliado);
    localStorage.setItem(this.avaliadosKey, JSON.stringify(avaliados));
    alert(`Você está avaliando o filme "${filme.title}" com ${nota}/5 estrelas.`);
  }

  salvarAvaliados() {
    localStorage.setItem(this.avaliadosKey, JSON.stringify(this.avaliados));
  }

  getAvaliados(): any[] {
    if (typeof window === 'undefined') return [];

    const avaliadosJSON = localStorage.getItem('avaliados');
    return avaliadosJSON ? JSON.parse(avaliadosJSON) : [];
  }

  adicionarAvaliados(filme: any) {
    if (!this.isAvaliados(filme.id)) {
      this.avaliados.push(filme);
      this.salvarAvaliados();
    }
  }

  removerAvaliados(filme: any): void {
    const avaliados = this.getAvaliados().filter(f => f.id !== filme.id);
    localStorage.setItem(this.avaliadosKey, JSON.stringify(avaliados));
  }

  isAvaliados(id: number): boolean {
    return this.avaliados.some(f => f.id === id);
  }

  atualizarAvaliacao(filme: any, novaNota: number): void {
    let avaliados = this.getAvaliados();
    const index = avaliados.findIndex(f => f.id === filme.id);
    if (index !== -1) {
      avaliados[index].avaliacao = novaNota;
      localStorage.setItem(this.avaliadosKey, JSON.stringify(avaliados));
      alert(`Você atualizou a avaliação do filme "${filme.title}" com ${novaNota}/5 estrelas.`);
    }
  }
}