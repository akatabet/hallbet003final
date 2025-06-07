#!/bin/bash

echo "🔍 Carregando variáveis do .env..."
export $(grep -v '^#' .env | xargs)

echo "🔐 Obtendo token..."
TOKEN=$(curl -s -X POST https://hallbet003final.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","senha":"123456"}' | jq -r '.token')

if [[ -z "$TOKEN" || "$TOKEN" == "null" ]]; then
  echo "❌ Falha ao autenticar. Verifique o e-mail/senha do admin."
  exit 1
fi
echo "✅ Token: $TOKEN"

echo "🚀 Criando aposta de teste..."
curl -s -X POST https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"partida_id":1,"tipo_aposta":"casa","valor_apostado":50,"odd":2.5}' | jq

echo "📋 Listando apostas:"
curl -s https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer $TOKEN" | jq
