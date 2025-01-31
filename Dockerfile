# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build

# Ustaw katalog roboczy
WORKDIR /app

# Kopiuj pliki projektu (z pominięciem node_modules dzięki .dockerignore)
COPY . .

# Instaluj zależności
RUN npm install
RUN npm install -g @angular/cli

# Buduj aplikację w wersji produkcyjnej
RUN ng build --configuration=production

# Etap 2: Serwowanie aplikacji Angular
FROM nginx:1.25-alpine

# Usuń domyślną konfigurację Nginx
# RUN rm -rf /usr/share/nginx/html/*

# Kopiuj pliki z etapu budowy do katalogu Nginx
COPY --from=build /app/dist/basketstats-irt/browser /usr/share/nginx/html

# Eksponuj port 80
EXPOSE 80

# Uruchom Nginx
# CMD ["nginx", "-g", "daemon off;"]