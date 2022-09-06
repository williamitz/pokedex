<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
# Ejecutar en desarrollo

1. Clonar el respositorio
2. Ejecutar

```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar archivo __.env.template__ y renombrar por __.env__

6. Definir variables de entorno en archivo __.env__

7. Levantar aplicación
```
yarn start:dev
```

8. Iniciar seed
```
llamar al servicio http://localhost:300/v1/seed
```

## Stack usado
*Mongo DB
*Nest