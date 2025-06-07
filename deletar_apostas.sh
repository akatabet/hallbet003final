#!/bin/bash

export $(grep -v '^#' .env | xargs)

echo "🔐 Autenticando admin..."
TOKEN=$(curl -s -X POST https://hallbet003final.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","senha":"123456"}' | jq -r '.token')

if [[ -z "$TOKEN" || "$TOKEN" == "null" ]]; then
  echo "❌ Não foi possível autenticar. Verifique email/senha."
  exit 1
fi

echo "📋 Buscando apostas do usuário..."
apostas=$(curl -s https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer $TOKEN")

ids=$(echo "$apostas" | jq -r '.[].id')

for id in $ids; do
  echo "🗑️ Deletando aposta ID $id..."
  curl -s -X DELETE https://hallbet003final.onrender.com/api/apostas/$id \
    -H "Authorization: Bearer $TOKEN"
done

echo "✅ Todas apostas deletadas."
