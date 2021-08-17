#Este archivo tiene todas las instrucciones para que la maquina virtual funcione en Docker

#con esto le decimos la imagen y la version de esta que queremos
FROM node:16

#Creamos una ruta en el contenedor 

RUN mkdir -p /usr/src/app

# Declaremos la carpeta como espacio de trabajo

WORKDIR /app

#Ahora copiamos el package.json para instalar las dependencias en el contenedor

COPY package*.json ./

#Ahora instalamos las dependencias, bueno para iniciar la instalacion de estas

RUN npm install

#Ahora agrupamos la aplicacion en la propia imagen de docker

COPY . . 

#Ahora especificamos un puerto dentro de docker

EXPOSE 3000

#Comando para inicializar el proyecto

CMD ["npm", "start"]





