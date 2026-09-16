Projeto feito com **Next.js (App Router) + React + Tailwind CSS**, consumindo
dados da [Jolpica F1 API](https://github.com/jolpica/jolpica-f1).

## Como rodar

```bash
npm install
npm run dev
```

Depois acesse http://localhost:3000

## Estrutura do projeto

```
app/
  page.js                        -> Página inicial: próxima corrida + contagem regressiva + calendário + último pódio
  drivers/page.js                -> Lista de todos os pilotos (classificação atual)
  drivers/[driverId]/page.js     -> Perfil individual de um piloto
  races/page.js                  -> Calendário completo da temporada
  races/[season]/[round]/page.js -> Detalhes e resultado de uma corrida específica
  layout.js                      -> Layout raiz (Navbar + Footer)
  globals.css                    -> Tema (cores, fontes) em Tailwind v4
  not-found.js                   -> Página 404 customizada
  loading.js                     -> Tela de carregamento

components/                      -> Componentes reutilizáveis (NumBadge, RaceRow, DriverCard, ResultsTable...)
lib/
  api.js                         -> TODAS as chamadas à Jolpica F1 API ficam aqui
  format.js                      -> Funções de formatação (datas, bandeiras, status em pt-BR)
```

## Sobre a API

- Base URL: `https://api.jolpi.ca/ergast/f1`
- Sem autenticação, limite de **4 req/s** e **500 req/hora**
- Documentação: https://github.com/jolpica/jolpica-f1/tree/main/docs

Por isso, todas as chamadas em `lib/api.js` usam o cache nativo do Next.js
(`next: { revalidate }`), que guarda a resposta por um tempo (30 min na maioria
dos casos) e evita refazer a mesma requisição em todo carregamento de página.
