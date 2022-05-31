npx sequelize-cli init



Creating the first Model
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


Running Migrations:
 npx sequelize-cli migration:create --name comments  
npx sequelize-cli db:migrate

Creating the first Seed
npx sequelize-cli seed:generate --name demo-user

Running Seeds
npx sequelize-cli db:seed:all