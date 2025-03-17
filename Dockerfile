# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação
COPY . .

# Compile o TypeScript
RUN npm run build

# Exponha a porta que a aplicação utilizará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
