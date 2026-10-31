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

## Démarrage

L'ordre de démarrage recommandé :

1. `discovery-service` (Eureka)
2. `config-service`
3. `customer-service`
4. `inventory-service`
5. `billing-service`
6. `gateway-service`

```bash
cd <service> && ./mvnw spring-boot:run
```

## Stack

- Java 17
- Spring Boot 3.3.5
- Spring Cloud 2023.0.3
- Spring Cloud Gateway, Eureka, Config, OpenFeign
- Spring Data JPA / Spring Data REST
- H2 (base de données en mémoire)
- Angular (client web)
