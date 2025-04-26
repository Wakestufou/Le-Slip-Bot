# Le Magnifique

## Commands

### Mise en production

Vous pouvez juste exécuter le script `start-prod.sh`

- `npm i` -> Installation des dépendances
- `npm run build` -> Compile le typescript en javascript
- `npm run deploy-commands` -> Permet de mettre à jour les (/) commands coté discord
- `npm start` -> Lance le bot

### Tester en exécutant le typescript directement

Vous pouvez juste exécuter le script `start-dev.sh`

- `npm i` -> Installation des dépendances
- `npm run dev` -> exécute le typescript en rechargement automatiquement lorsque vous mettez à jour un fichier .ts
- `npm run dev-deploy-commands -- DEV` -> Permet de mettre à jour les (/) commands coté discord de dev
- `npm run dev-deploy-commands -- DELETE` -> Permet de supprimés les (/) commands coté discord de dev

### Docker

Build Image :

```bash
podman build -t <name_image> .
```

Create + start container

```bash
podman run -d --name <name_container> <name_image>
```

List Images :

```bash
podman images
```

List containers :

```bash
podman container ls
```

Remove containers :

```bash
podman rm <id|name>
```

## Fonctionnement

Ne pas oublier de copier le .env.exemple et de remplir les bonnes informations !

### Création d'une (/) commands

Ajouter dans un sous-dossier du dossier `commands` un fichier avec un `export default` de type `SlashCommand` (Voir la command [ping](src/commands/utils/ping.ts) comme exemple !)

### Création d'un évent

Ajouter dans le dossier `events` un fichier avec un `export default` de type `Event` (Voir l'évent [ready](src/events/ready.ts) ou l'évent [interactionCreate](src/events/interactionCreate.ts) comme exemple !)
