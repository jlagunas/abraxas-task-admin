# Abraxas task administrator

## About
Technical test for abraxas backend developer

## Up and running development environment

### Requirements
- Docker
- Docker compose

### Command
```sh
docker-compose up
```

### Stack
- Node.JS / express
- MySQL 5.7 / sequelize

## API documentation

### Reset and preload with some tasks
#### URL
```
POST http://localhost:3000/preloaded
```

### Create a task
#### URL
```
POST http://localhost:3000/tasks
```
### params

| name             |   type                    |   required  |  default  |
|:-----------------|---------------------------|------------:|----------:|
| description      | string                    |    yes      | none      |
| estimated_time   | int                       |    no       | 0         |
| registered_time  | int                       |    no       | 0         |
| status           | ENUM[pending, completed]  |    no       | pending   |

### Update a task
**Note:** You cannot update a completed task

```
PUT http://localhost:3000/tasks/:taskId
```
### params

| name             |   type                    |   required  |  default  |
|:-----------------|---------------------------|------------ |----------:|
| description      | string                    |    yes      | none      |
| estimated_time   | int                       |    no       | 0         |
| registered_time  | int                       |    no       | 0         |
| status           | ENUM[pending, completed]  |    no       | pending   |

### GET all tasks
```
GET http://localhost:3000/tasks
```

### GET all tasks with description like
```
GET http://localhost:3000/tasks?q=task
```

### GET all tasks with status equal to
```
GET http://localhost:3000/tasks?status=pending
```

### Delete a task
```
DELETE http://localhost:3000/tasks/:taskId
```
