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

## API documentation

### Create a task
#### URL
```
POST http://localhost:3000/tasks
```
### params

| param            |   type   |   optional  |
|:-----------------|----------|------------:|
| description      |  string  |    yes      |
| estimated_time   |  int     |    yes      |
| registered_time  |  int     |    yes      |

### Create a task
```
POST http://localhost:3000/tasks
```
