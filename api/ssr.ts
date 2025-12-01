import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';

// Habilita produção
enableProdMode();

// Caminho para os builds gerados pelo Angular
const DIST_FOLDER = join(process.cwd(), 'dist/centro-paula-filmes/browser');
const SERVER_MAIN = join(process.cwd(), 'dist/centro-paula-filmes/server/main');

// Import do AppServerModule do build do server
const { AppServerModule } = require(SERVER_MAIN);

const app = express();

// Configura engine de renderização
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Servir arquivos estáticos
app.get('*.*', express.static(DIST_FOLDER, { maxAge: '1y' }));

// SSR para todas as rotas Angular
app.get('*', (req, res) => {
  res.render('index', { req });
});

export default app;
