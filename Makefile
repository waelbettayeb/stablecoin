run-docker:
	docker-compose up -d

run-backend:
	npm install -C backend && npm start -C backend

run-frontend:
	npm install -C frontend && npm run build -C frontend && npm start -C frontend

.PHONY: run-docker run-backend run-frontend