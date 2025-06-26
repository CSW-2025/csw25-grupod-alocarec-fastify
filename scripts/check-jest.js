#!/usr/bin/env node
try {
  require.resolve('jest');
} catch (e) {
  console.warn('Jest nao esta instalado. Execute `npm install` antes de rodar os testes.');
  process.exit(1);
}
