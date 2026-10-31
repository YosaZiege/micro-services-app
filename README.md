# Micro-services App

Application de gestion des factures basée sur une architecture micro-services.

Chaque facture (bill) contient des produits (product items) et appartient à un client (customer).

## Architecture

| Service              | Port  | Rôle                                            |
|----------------------|-------|-------------------------------------------------|
| `discovery-service`  | 8761  | Annuaire de services (Eureka)                   |
| `config-service`     | 9999  | Configuration centralisée (Spring Cloud Config) |
| `gateway-service`    | 8888  | API Gateway (Spring Cloud Gateway)              |
| `customer-service`   | 8081  | Gestion des clients                             |
| `inventory-service`  | 8082  | Gestion des produits                            |
| `billing-service`    | 8083  | Gestion des factures (OpenFeign)                |
| `angular-client`     | 4200  | Client web (Angular)                            |

## Démarrage

L'ordre de démarrage recommandé :

1. `discovery-service` (Eureka)
2. `config-service`
3. `customer-service`
4. `inventory-service`
5. `billing-service`
6. `gateway-service`
7. `angular-client`

### Services backend

Prérequis : Java 17 et Maven installés. Ouvrir un terminal par service et
attendre que chacun soit démarré avant de lancer le suivant.

```bash
cd <service> && mvn spring-boot:run
```

Chaque service dispose de son propre `pom.xml` ; le dépôt ne contient pas de
script `mvnw`. Pour compiler un service : `cd <service> && mvn verify`.

### Client Angular

Le client communique avec la gateway via un proxy de développement :

```bash
cd angular-client && npm install && npm start
```

Accès : <http://localhost:4200>

## Routes de la gateway (routage dynamique via Eureka)

| URL                                                              | Service           |
|------------------------------------------------------------------|-------------------|
| `http://localhost:8888/customer-service/api/customers`           | customer-service  |
| `http://localhost:8888/inventory-service/api/products`           | inventory-service |
| `http://localhost:8888/billing-service/bills/{id}`               | billing-service   |

## Configuration centralisée

Le `config-service` utilise le profil `native` et lit les fichiers de
configuration depuis `config-service/src/main/resources/config-repo/` :

- `application.properties` : configuration partagée (Eureka, actuator, …)
- `{service}-{profile}.properties` : configuration spécifique à chaque service

Exemples de vérification après démarrage :

```bash
curl http://localhost:9999/customer-service/default
curl http://localhost:8888/customer-service/testConfig1
curl http://localhost:8888/billing-service/bills/1
```

## Stack

- Java 17
- Spring Boot 3.3.5
- Spring Cloud 2023.0.3
- Spring Cloud Gateway, Eureka, Config, OpenFeign
- Spring Data JPA / Spring Data REST
- H2 (base de données en mémoire)
- Angular 21
