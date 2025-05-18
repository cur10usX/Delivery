# 1. Usa imagem Node para build do React
FROM node:18 as build

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia os arquivos do React
COPY package*.json ./
RUN npm install && npm install react-scripts

COPY . .
RUN npm run build

# 4. Usa um servidor Nginx leve para servir a app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 5. Expondo a porta padrão do Nginx
EXPOSE 80

# 6. Nginx já sabe o que fazer por padrão, não precida de CMD
