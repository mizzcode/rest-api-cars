# RESTful API Car Management

## How to use?

```
$ git clone https://github.com/mizzcode/rest-api-cars.git # get source code of the repository
$ cp .env.example .env # copy file .env.example to .env
$ npm install # install package
```

## Database

```
$ docker compose up -d # run database
$ docker compose down -v # delete database and the volume
```

## Scripts

```
$ npm run build # build typescript project
$ npm run dev # run in development mode
$ npm run setup # run migration, seeder
$ npm run knex migrate:make migration_name # create new file migration
$ npm run knex seed:make seed_name # create new file seeds
$ npm run keys # create private and public key jwt # !! no passphrase !!
```

## Account User

```json
{
  "email": "mizz@gmail.com",
  "name": "Misbah",
  "password": "password",
  "role": "superadmin"
}
```

## Entity Relationship Diagram

![image](https://github.com/mizzcode/rest-api-cars/assets/101040281/7602d2ad-48e8-4a27-bda3-de4bc9f06361)

# API Spec

## Login User

Request :

- Method : POST
- Endpoint : `/api/v1/users/login`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "email": "mizz@gmail.com",
  "password": "password"
}
```

Response :

> code 200

```json
{
  "token": "string"
}
```

## Register User

Request :

- Method : POST
- Endpoint : `/api/v1/users/register`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "email": "jani@gmail.com",
  "name": "Anjani",
  "password": "password"
}
```

Response :

> code 201

```json
{
  "user": {
    "email": "jani@gmail.com",
    "name": "Anjani",
    "password": "hash of string",
    "role": "member"
  }
}
```

## Add User

Request :

- Method : POST
- Endpoint : `/api/v1/users/add`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer token
- Body :

```json
{
  "email": "dummy@gmail.com",
  "name": "Dummy",
  "password": "password",
  "role": "admin"
}
```

Response :

> code 200

```json
{
  "user": {
    "email": "dummy@gmail.com",
    "name": "Dummy",
    "password": "hash of string",
    "role": "admin",
    "id": "number"
  }
}
```

## Profile User

Request :

- Method : POST
- Endpoint : `/api/v1/users/profile`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer token

Response :

> code 200

```json
{
  "id": "number",
  "email": "mizz@gmail.com",
  "name": "Misbah",
  "role": "superadmin",
  "iat": "number",
  "exp": "number"
}
```

## Create Car

Request :

- Method : POST
- Endpoint : `/api/v1/cars`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer token
- Body :

```json
{
  "plate": "M 003 TGL",
  "manufacture": "BMW",
  "model": "X5",
  "image": "cars.jpg",
  "rentPerDay": 550000,
  "capacity": 4,
  "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
  "transmission": "Automatic",
  "available": true,
  "type": "Sedan",
  "year": 2010,
  "options": ["Cruise Control", "Tinted Glass", "Tinted Glass", "Tinted Glass", "AM/FM Stereo"],
  "specs": [
    "Brake assist",
    "Leather-wrapped shift knob",
    "Glove box lamp",
    "Air conditioning w/in-cabin microfilter",
    "Body color folding remote-controlled pwr mirrors",
    "Dual-stage front airbags w/occupant classification system"
  ]
}
```

Response :

> code 201

```json
{
  "status": "Success",
  "message": "Car was added successfully!",
  "data": {
    "carId": "a78366f3-04e4-4c42-acdd-3bf4e7a805e2"
  },
  "statusCode": 201
}
```

## All Car

Request :

- Method : GET
- Endpoint : `/api/v1/cars`
- Header :
  - Accept: application/json

Response :

> code 200

```json
[
  {
    "id": "e76e884b-8f3e-4b90-a717-9239676d0191",
    "plate": "IDN-5442",
    "manufacture": "Honda",
    "model": "Civic",
    "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
    "rentPerDay": 1000000,
    "capacity": 2,
    "description": " Electric speed-sensitive variable-assist pwr steering. Steel side-door impact beams. Dual bright exhaust tips.",
    "availableAt": "2023-11-14T16:13:31.395Z",
    "transmission": "CVT",
    "available": false,
    "type": "Wagon",
    "year": 2015,
    "options": [
      "CD (Single Disc)",
      "Airbag: Passenger",
      "A/C: Front",
      "Power Locks",
      "Navigation",
      "Rear Window Defroster",
      "Rear Window Defroster",
      "MP3 (Single Disc)",
      "Airbag: Side"
    ],
    "specs": [
      "Electric speed-sensitive variable-assist pwr steering",
      "Steel side-door impact beams",
      "Dual bright exhaust tips",
      "Remote fuel lid release",
      "Traveler/mini trip computer"
    ]
  },
  {
    "id": "a78366f3-04e4-4c42-acdd-3bf4e7a805e2",
    "plate": "M 003 TGL",
    "manufacture": "BMW",
    "model": "X5",
    "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
    "rentPerDay": 550000,
    "capacity": 4,
    "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2023-11-12T07:17:56.057Z",
    "transmission": "Automatic",
    "available": true,
    "type": "Sedan",
    "year": 2010,
    "options": ["Cruise Control", "Tinted Glass", "Tinted Glass", "Tinted Glass", "AM/FM Stereo"],
    "specs": [
      "Brake assist",
      "Leather-wrapped shift knob",
      "Glove box lamp",
      "Air conditioning w/in-cabin microfilter",
      "Body color folding remote-controlled pwr mirrors",
      "Dual-stage front airbags w/occupant classification system"
    ]
  }
]
```

## Detail Car

Request :

- Method : GET
- Endpoint : `/api/v1/cars/:id`
- Header :
  - Accept: application/json

Response :

> code 200

```json
{
  "id": "a78366f3-04e4-4c42-acdd-3bf4e7a805e2",
  "plate": "M 003 TGL",
  "manufacture": "BMW",
  "model": "X5",
  "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
  "rentPerDay": 550000,
  "capacity": 4,
  "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
  "availableAt": "2023-11-08T17:18:52.195Z",
  "transmission": "Automatic",
  "available": true,
  "type": "Sedan",
  "year": 2010,
  "options": ["Cruise Control", "Tinted Glass", "Tinted Glass", "Tinted Glass", "AM/FM Stereo"],
  "specs": [
    "Brake assist",
    "Leather-wrapped shift knob",
    "Glove box lamp",
    "Air conditioning w/in-cabin microfilter",
    "Body color folding remote-controlled pwr mirrors",
    "Dual-stage front airbags w/occupant classification system"
  ]
}
```

## Update Car

Request :

- Method : PATCH
- Endpoint : `/api/v1/cars/:id`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization: Bearer token
- Body :

```json
{
  "plate": "J 026 BKS",
  "rentPerDay": 950000,
  "capacity": 2
}
```

Response :

> code 200

```json
{
  "status": "Success",
  "message": "Car was updated successfully!",
  "statusCode": 200
}
```

## Delete All Car

Request :

- Method : DELETE
- Endpoint : `/api/v1/cars`
- Header :
  - Accept: application/json
  - Authorization: Bearer token

Response :

> code 200

```json
{
  "status": "Success",
  "message": "All Car deleted successfully!",
  "statusCode": 200
}
```

## Delete Car By Id

Request :

- Method : DELETE
- Endpoint : `/api/v1/cars/:id`
- Header :
  - Accept: application/json
  - Authorization: Bearer token

Response :

> code 200

```json
{
  "status": "Success",
  "message": "Car was deleted successfully!",
  "statusCode": 200
}
```
