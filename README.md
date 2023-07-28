# Controlbox

1. Para desplegar el proyecto se utilizó vercel y este realiza el despliegue automaticamente
2. Para correr el proyecto localmente se emplea el comando "npm run dev"
3. Para subir modificaciones sobre la base de datos se usa el comando "npm run prisma:push"
4. Para generar de nuevo las configuraciones de prisma en el proyecto de next se usa "npm run prisma:generate"
5. Para correr el ORM prisma se usa el comando "npm run prisma:studio" esto levanta una ventana en localhost para poder crear, modificar y eliminar datos de la base de datos de postgresql
6. Para crear la base de datos localmente se necesita instalar postgresql y crear la base de datos llamada controlbox.
7. Si se va a modificar la estructura de las tablas se debe editar el archivo "schema.prisma" y hacer push de los cambios con el comando "npm run prisma:push"
8. Se necesita tener el archivo .env con las variables necesarias de conexion de github y prisma

```bash
POSTGRES_PRISMA_URL="**********************************"
POSTGRES_URL_NON_POOLING="**********************************"

# GitHub OAuth
GITHUB_ID=****************
GITHUB_SECRET=********************
NEXTAUTH_URL=http://localhost:3000/api/auth
```