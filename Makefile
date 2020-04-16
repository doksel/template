# STAGES SETTINGS COMMANDS

dev: | dev-env docker-build docker-up
stage: | stage-env docker-build docker-up
test-stage: | test-stage-env docker-build docker-up


# DOCKER COMPOSE COMANDS

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d --force-recreate

docker-down:
	docker-compose down -v

# ENVIRONMENTS

dev-env:
	cp ./env_settings/.env.dist .env

stage-env:
	cp ./env_settings/.env.dist.stage .env

test-stage-env:
	cp ./env_settings/.env.dist.test .env