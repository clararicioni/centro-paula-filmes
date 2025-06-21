import { Routes } from '@angular/router';
import { AvaliadosComponent } from './pages/avaliados/avaliados.component';
import { AssistirComponent } from './pages/assistir/assistir.component';
import { AssistidosComponent } from './pages/assistidos/assistidos.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'assistidos', component: AssistidosComponent },
  { path: 'assistir', component: AssistirComponent },
  { path: 'avaliados', component: AvaliadosComponent }
];