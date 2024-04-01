docker build -t 315426346/task-manager-client:latest ./client
docker build -t 315426346/task-manager-api:latest ./api
docker build -t 315426346/task-manager-mail:latest ./mail
docker build -t 315426346/task-manager-auth:latest ./auth

docker push 315426346/task-manager-client
docker push 315426346/task-manager-api
docker push 315426346/task-manager-mail
docker push 315426346/task-manager-auth



# with GIT SHA
docker build -t 315426346/task-manager-client:$SHA ./client
docker build -t 315426346/task-manager-api:$SHA ./api
docker build -t 315426346/task-manager-mail:$SHA ./mail
docker build -t 315426346/task-manager-auth:$SHA ./auth

docker push 315426346/task-manager-client:$SHA
docker push 315426346/task-manager-api:$SHA
docker push 315426346/task-manager-mail:$SHA
docker push 315426346/task-manager-auth:$SHA



kubectl apply -f ./k8s
