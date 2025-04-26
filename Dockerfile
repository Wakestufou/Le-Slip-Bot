FROM node:23-bookworm

# Timezone
ENV TZ=Europe/Paris

# Dépendances système pour build natif
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  pkg-config \
  libc6-dev \
  && rm -rf /var/lib/apt/lists/*

# Créer un dossier de travail
WORKDIR /slip-bot

# Copier uniquement les fichiers nécessaires au début pour profiter du cache Docker
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du projet
COPY . .

# Construire l'app TypeScript
RUN npm run build

# Vérification de la timezone
RUN echo "Timezone: $TZ" && date

RUN chmod +x ./start.sh

# Lancer l'app
CMD ["./start.sh"]