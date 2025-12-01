# API Guide

## Vehicles

| Route             | Example URL                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET all vehicles  | [http://localhost:3000/api/vehicles](http://localhost:3000/api/vehicles)                                                                                 |
| GET vehicle by ID | [http://localhost:3000/api/vehicles/1](http://localhost:3000/api/vehicles/1)                                                                             |
| Search vehicle    | [http://localhost:3000/api/vehicles/search?make=Honda&model=Civic&year=2022](http://localhost:3000/api/vehicles/search?make=Honda&model=Civic&year=2022) |

## Categories

| Route              | Example URL                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| GET all categories | [http://localhost:3000/api/categories](http://localhost:3000/api/categories)                                         |
| GET category by ID | [http://localhost:3000/api/categories/1](http://localhost:3000/api/categories/1)                                     |
| Search category    | [http://localhost:3000/api/categories/search?name=Battery](http://localhost:3000/api/categories/search?name=Battery) |

## Parts

| Route                    | Example URL                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| GET all parts            | [http://localhost:3000/api/parts](http://localhost:3000/api/parts)                               |
| GET part by ID           | [http://localhost:3000/api/parts/1](http://localhost:3000/api/parts/1)                           |
| Search parts             | [http://localhost:3000/api/parts/search?q=brake](http://localhost:3000/api/parts/search?q=brake) |
| GET parts by category ID | [http://localhost:3000/api/parts/categories/1](http://localhost:3000/api/parts/categories/1)     |

## Search

| Route                | Example URL                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| Search by make/model | [http://localhost:3000/?search=Honda%20Civic](http://localhost:3000/?search=Honda%20Civic) |
| Search by part name  | [http://localhost:3000/?search=Brake%20Pads](http://localhost:3000/?search=Brake%20Pads)   |
