# PMSIpilot calendar board

Board pour le calendrier des salles de réunion de la société PMSIpilot

## Configuration

Le fichier de configuration `config/config.json` permet de rajouter des calendriers dans la liste d'id.

Il faut également ajouter une clé OAuth de type `Web application` générée via la console de Google (à mettre dans `config/key.json`)

## Installation

```
$ make
```

## Déploiement avec Docker

Il est possible de déployer le projet grâce à un conteneur Docker.

Pour cela, éditer les variables d'environnement du fichier `docker-compose.yml` avec les informations de connexion OAuth2 de Google.

Il est également possible, de définir un volume sur le fichier `keys.json` tel que: `./monfichierkeys.json:/calendar-board/config/keys.json:ro`. Les variables d'environnement ne sont alors pas prises en compte.

Ensuite, executer `docker-compose up`. Le service est ensuite accessible sur http://localhost:8080

## Contribution

```
$ make dev
```

Application disponible à l'adresse `localhost:8080`
