# RESTful API Car Management

## How to use?

```
$ npm install
$ npm run dev # run development!
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
```

## Entity Relationship Diagram
![image](https://github.com/mizzcode/rest-api-cars/assets/101040281/353916f1-7519-43ab-ad9a-f2b0328c44b9)

# API Spec

## Create Car

Request :
- Method : POST
- Endpoint : `/api/v1/cars`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    {
        "plate": "M 003 TGL",
        "manufacture": "BMW",
        "model": "X5",
        "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
        "rentPerDay": 550000,
        "capacity": 4,
        "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
        "transmission": "Automatic",
        "available": true,
        "type": "Sedan",
        "year": 2010,
        "options": [
            "Cruise Control",
            "Tinted Glass",
            "Tinted Glass",
            "Tinted Glass",
            "AM/FM Stereo"
        ],
        "specs": [
            "Brake assist",
            "Leather-wrapped shift knob",
            "Glove box lamp",
            "Air conditioning w/in-cabin microfilter",
            "Body color folding remote-controlled pwr mirrors",
            "Dual-stage front airbags w/occupant classification system"
        ]
    }
}
```

Response :

```json 
{
    "status": "Success",
    "message": "Car was added successfully!",
    "data": {
        "carId": 26
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

```json 
[
    {
        "id": 25,
        "plate": "IDN-5442",
        "manufacture": "Honda",
        "model": "Civic",
        "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
        "rentPerDay": 1000000,
        "capacity": 2,
        "description": " Electric speed-sensitive variable-assist pwr steering. Steel side-door impact beams. Dual bright exhaust tips.",
        "availableAt": "2023-11-08T14:41:15.571Z",
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
        "id": 26,
        "plate": "M 003 TGL",
        "manufacture": "BMW",
        "model": "X5",
        "image": "https://res.cloudinary.com/dshomxqjc/image/upload/v1699341621/cars.jpg",
        "rentPerDay": 550000,
        "capacity": 4,
        "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
        "availableAt": "2023-11-08T16:53:02.134Z",
        "transmission": "Automatic",
        "available": true,
        "type": "Sedan",
        "year": 2010,
        "options": [
            "Cruise Control",
            "Tinted Glass",
            "Tinted Glass",
            "Tinted Glass",
            "AM/FM Stereo"
        ],
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

```json 
{
    "id": 26,
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
    "options": [
        "Cruise Control",
        "Tinted Glass",
        "Tinted Glass",
        "Tinted Glass",
        "AM/FM Stereo"
    ],
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
- Body :

```json 
{
    "plate": "J 026 BKS",
    "rentPerDay": 950000,
    "capacity": 2
}
```

Response :

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

Response :

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

Response :

```json 
{
    "status": "Success",
    "message": "Car was deleted successfully!",
    "statusCode": 200
}
```
