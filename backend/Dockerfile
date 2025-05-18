# Usa imagem base do Node
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["node", "server.js"]

