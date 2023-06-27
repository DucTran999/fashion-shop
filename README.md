# Fashion Online shop
This online shop project was built with PERN stack ( PostgreSQL, Express, React, and Node.js). The project allows users to browse products, add items to their cart, and check out their purchases, get notifications in real time.

## License
- This project is just for practicing my web development skills and is not used for e-commerce purposes.
- **The images copyright** I'm using in the project are **possessed by [the MARC brand], [Freepik], and [Pixels]**, and I want to give many thanks to them for the beautiful images.

[the MARC brand]: https://marc.com.vn/
[Freepik]: https://www.freepik.com/search?format=search&query=fashion&type=photo
[Pixels]: https://www.pexels.com/vi-vn/tim-kiem/model/

## Browser support
- Chrome
- Firefox
- Safari
- Microsoft Edge

## Installation
To install the project, follow these steps:
1. Clone the repository to your local machine.
```
$ git clone https://github.com/DucTran999/fashion-shop.git
```
2. Install the required dependencies using npm.
```
$ npm i
```
- If you prefer yarn:
```
$ yarn add
```
3. Set up the database:
- If you want to use docker:
```
# docker-compose.yml
version: "3.8"

services: 
  postgres-db:
    image: "postgres:[version]"
    restart: always
    ports: [host port, 5432 also ok]:"5432"
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - [host path]: [container path]

  redis-db:
    image: "redis:[version]"
    restart: always
    ports: [host port, 6379 also ok]:"6379"
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - [host-path]: [container-path]
```
- You also can use Postgres and Redis are installed locally or try **[Redis free clound]**

[Redis free clound]: https://redis.com/try-free/

4. Run the script to add the schema using
```
$ psql -h YOUR_HOST -d YOUR_DATABASE_NAME -U YOUR_USERNAME -f atlanashop_schema.sql
```
Customize the schema to suit your requirements or create it on your own.

5. Start project:
- Go to the server directory and start the server in development mode. 
```
$ cd server
$ npm run dev
```
- Start the client page using:
```
$ cd client
$ npm start
```
- Start the admin page using:
```
$ cd admin
$ npm start
```


