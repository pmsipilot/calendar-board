# PMSIpilot calendar board

Board pour le calendrier des salles de réunion de la société PMSIpilot

## Configuration

Le fichier de configuration `config/config.json` permet de rajouter des calendriers dans la liste d'id.

Il faut également ajouter une clé OAuth de type `Web application` générée via la console de Google (à mettre dans `config/key.json`)

## Installation

```
$ make
```

## Contribution

```
$ make dev
```

Application disponible à l'adresse `localhost:8080`
