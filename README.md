# CRM Med OpenAI

Projeto React + Vite recriado do zero para substituir a integracao Base44 por OpenAI.

## Requisitos

- Node.js 18+
- Chave de API da OpenAI

## Configuracao

1. Copie `.env.example` para `.env`
2. Preencha:
   - `VITE_OPENAI_API_KEY`
   - `VITE_OPENAI_MODEL` (opcional, padrao `gpt-4o-mini`)

## Executar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Observacao de seguranca

Este exemplo chama a OpenAI direto do frontend (via `VITE_OPENAI_API_KEY`), ideal apenas para testes locais.
Em producao, mova a chamada para um backend/proxy para nao expor a chave no navegador.
