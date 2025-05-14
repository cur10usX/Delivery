# 1. Usa uma imagem base do Node
FROM node:18

# 2. Define diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia os arquivos de dependências primeiro
COPY package* .json ./

# 4. Instala as dependências
RUN npm install

# 5. copia o restante do código
COPY . .

# 6. Expõe a porta da API
EXPOSE 5000

# 7. Comando para rodar a API
CMD ["node", "server.js"]
