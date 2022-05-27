SHELL := /bin/bash

start: setup_env setup_nvm_pgdata up start_server

up:
	docker-compose up -d shortdb gql yaus-broker shortnr-cache shortnr-redis-commander
	echo "the script will sleep for 60s to let the services start"
	sleep 60s
	echo "The docker containers are up"

setup_nvm_pgdata:
	touch somefile
	# Install NVM
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

	# Load NVM
	export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
	[ -s "${NVM_DIR}/nvm.sh" ] && \. "${NVM_DIR}/nvm.sh"
	source $(HOME)/.nvm/nvm.sh ;\
	nvm install 16
	source $(HOME)/.nvm/nvm.sh ;\
	nvm use 16

	sudo apt-get install unzip
	sudo rm -rf pgdata
	unzip pgdata.zip


setup_env: 
	sudo cp src/sample.env .env
	sudo cp .env src/.env
	mkdir -p broker
	sudo chown -R 1001:1001 broker

start_server: 
	echo "Starting the YAUS server"
	cd src && yarn install
	cd src && yarn start

stop:
	docker-compose stop

down:
	docker-compose down

reset: down start
	