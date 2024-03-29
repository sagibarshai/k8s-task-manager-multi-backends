docker build -t 315426346/task-manager-client:latest ./client
docker build -t 315426346/task-manager-api:latest -f ./api/Dockerfile.dev ./api
docker build -t 315426346/task-manager-mail:latest -f ./mail/Dockerfile.dev ./mail
docker build -t 315426346/task-manager-auth:latest -f ./auth/Dockerfile.dev ./auth

docker push 315426346/task-manager-client
docker push 315426346/task-manager-api
docker push 315426346/task-manager-mail
docker push 315426346/task-manager-auth



# with GIT SHA
docker build -t 315426346/task-manager-client:$SHA ./client
docker build -t 315426346/task-manager-api:$SHA -f ./api/Dockerfile.dev ./api
docker build -t 315426346/task-manager-mail:$SHA -f ./mail/Dockerfile.dev ./mail
docker build -t 315426346/task-manager-auth:$SHA -f ./auth/Dockerfile.dev ./auth

docker push 315426346/task-manager-client:$SHA
docker push 315426346/task-manager-api:$SHA
docker push 315426346/task-manager-mail:$SHA
docker push 315426346/task-manager-auth:$SHA



kubectl apply -f ./k8s
