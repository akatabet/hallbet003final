#!/bin/bash

echo "🚀 Corrigindo ambiente de backend..."

# 1. Verifica se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Instale e tente novamente."
    exit 1
fi

# 2. Verifica se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Instale o Node.js corretamente."
    exit 1
fi

# 3. Instala dependências
echo "📦 Instalando dependências..."
npm install

# 4. Verifica se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado. Criando um arquivo de exemplo..."
    cat > .env <<EOL
DB_NAME=u623447797_hallbet003
DB_USER=u623447797_hallbetadmin
DB_PASSWORD=Sd12.2003
DB_HOST=srv725.hstgr.io
DB_PORT=3306
PORT=10000
JWT_SECRET=segredo_super_secreto_123
EOL
    echo "✅ Arquivo .env criado!"
else
    echo "✅ .env já existe."
fi

# 5. Exporta variáveis do .env
export $(cat .env | xargs)

# 6. Testa conexão com banco
echo "🧪 Testando conexão com MySQL..."
if command -v mysql &> /dev/null; then
    mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "USE $DB_NAME;" &> /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Conexão com o banco OK!"
    else
        echo "❌ Falha na conexão com o banco. Verifique usuário, senha ou host no .env."
    fi
else
    echo "⚠️ Comando mysql não disponível no Bash. Use CMD ou PowerShell para testar a conexão com o banco."
fi

# 7. Inicia o servidor Node.js
echo "🚀 Iniciando servidor Node.js..."
node index.js
