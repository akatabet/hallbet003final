#!/bin/bash

echo "🔧 Criando .env com credenciais do banco de dados..."
cat > .env <<EOL
DB_NAME=u623447797_hallbet003
DB_USER=u623447797_hallbetadmin
DB_PASSWORD=Sd12.2003
DB_HOST=srv725.hstgr.io
DB_PORT=3306
PORT=10000
JWT_SECRET=segredo_super_secreto_123
EOL

echo "📦 Instalando dependências..."
npm install

echo "🌍 Exportando variáveis do .env..."
export $(cat .env | xargs)

echo "🛠️ Corrigindo include com alias 'partida'..."
sed -i.bak "s/include: { *model: *Partida.*/include: { model: Partida, as: 'partida', attributes: \['time_casa', 'time_fora', 'data_hora'\] },/" routes/apostas.js

echo "🚀 Iniciando servidor..."
nohup node index.js &

echo "⏳ Aguardando 5 segundos para garantir que o servidor subiu..."
sleep 5

echo "🧪 Testando criação de aposta..."
curl -X POST https://hallbet003final.onrender.com/api/apostas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MjM5OTI0LCJleHAiOjE3NDk4NDQ3MjR9.7i1RblU6Jz4hRcTts5eyfmIbvHAIH5OD_OojvSyFf90" \
  -d '{"partida_id":1, "tipo_aposta":"casa", "valor_apostado":100, "odd": 1.8}'

echo -e "\n📃 Listando apostas do usuário autenticado:"
curl https://hallbet003final.onrender.com/api/apostas \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5MjM5OTI0LCJleHAiOjE3NDk4NDQ3MjR9.7i1RblU6Jz4hRcTts5eyfmIbvHAIH5OD_OojvSyFf90"
