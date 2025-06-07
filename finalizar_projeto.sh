#!/bin/bash

echo "🔍 Verificando dependências..."

if ! command -v jq &> /dev/null; then
  echo "❌ jq não está instalado. Por favor instale antes de continuar."
  exit 1
fi

echo "📄 Verificando .env..."
if [ ! -f .env ]; then
  echo "❌ Arquivo .env não encontrado!"
  exit 1
fi

echo "🌍 Exportando variáveis do .env..."
export $(grep -v '^#' .env | xargs)

echo "🛠️ Corrigindo include com alias 'partida' se necessário..."
sed -i 's/include: { *model: Partida/include: { model: Partida, as: '\''partida'\''/' routes/apostas.js

echo "🚀 Iniciando servidor com nohup (sem pkill)..."
nohup node index.js > server.log 2>&1 &

sleep 4

echo "🧪 Testando criação de aposta..."

curl -s -X POST https://hallbet003final.onrender.com/api/apostas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MjM5OTI0LCJleHAiOjE3NDk4NDQ3MjR9.7i1RblU6Jz4hRcTts5eyfmIbvHAIH5OD_OojvSyFf90" \
  -d '{"partida_id":1, "tipo_aposta":"casa", "valor_apostado":100, "odd": 1.8}' \
| jq

echo "📋 Listando apostas:"
curl -s https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MjM5OTI0LCJleHAiOjE3NDk4NDQ3MjR9.7i1RblU6Jz4hRcTts5eyfmIbvHAIH5OD_OojvSyFf90" \
| jq
