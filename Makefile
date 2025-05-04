# Caminho padrão do serviço Node no docker-compose
SERVICE=api

# Comandos principais
up:
	docker-compose up --build

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up --build

# Executar um comando dentro do container
exec:
	docker-compose exec $(SERVICE) sh

# Rodar migration com nome customizado: make migrate name=add-age-to-user
migrate:
	docker-compose exec $(SERVICE) sh -c "npx prisma migrate dev --name $(name)"

# Gerar client Prisma (em caso de alteração de schema, mas sem migration)
generate:
	docker-compose exec $(SERVICE) sh -c "npx prisma generate"

# Ver banco (roda Prisma Studio)
studio:
	docker-compose exec $(SERVICE) sh -c "npx prisma studio"

# Logs
logs:
	docker-compose logs -f
