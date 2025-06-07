#!/bin/bash

### ✅ Etapa 1: Verificar se .env local está correto
if [ ! -f .env ]; then
  echo "❌ Arquivo .env não encontrado."
  exit 1
fi

### ✅ Etapa 2: Carregar variáveis do .env para uso local
export $(grep -v '^#' .env | xargs)

### ✅ Etapa 3: Verificar se variáveis essenciais estão definidas
vars=(DB_NAME DB_USER DB_PASSWORD DB_HOST DB_PORT JWT_SECRET)
for var in "${vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Variável $var não definida no .env"
    exit 1
  fi
done

echo "✅ Variáveis .env carregadas corretamente."

### ✅ Etapa 4: Autenticar e obter token de acesso
TOKEN=$(curl -s -X POST https://hallbet003final.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com", "senha":"123456"}' | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Falha ao obter token de autenticação."
  exit 1
fi

echo "🔐 Token obtido com sucesso."

### ✅ Etapa 5: Enviar aposta de teste
response=$(curl -s -X POST https://hallbet003final.onrender.com/api/apostas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"partida_id":1, "tipo_aposta":"casa", "valor_apostado":100, "odd": 1.8}')

echo "🚀 Resposta da API ao criar aposta:"
echo "$response"

### ✅ Etapa 6: Verificar se a aposta foi persistida com sucesso
list=$(curl -s https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer $TOKEN")

echo "📋 Listagem de apostas salvas para este token:"
echo "$list" | jq

### ✅ Etapa 7: Mensagem Final
echo "🎉 Teste completo. Verifique seu banco na Hostinger via phpMyAdmin se os dados foram inseridos."

# Fim
