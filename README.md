Task Manager is a web application that comes with a simple UI, authentication, a welcome email when signing up, and CRUD operations for managing tasks. 


The application consists of the following services:

1) Client - developed using React-TS, react-router, axios response interceptor, and styled-component with a large and scalable global theme.
2) Authentication - built on Node-TS, JsonWebToken, and bcryptjs, it offers cookie-based authentication.
3) API - created with Node-TS, this service is responsible for serving CRUD operations for tasks.
4) Mail - this service, written with Node-TS, is responsible for sending welcome emails after sign-up on the first time.


The application architecture comprises a Kubernetes cluster that consists of:

Five deployments - Client (1 Replica, served through an nginx server), 
Authentication (2 Replicas), API (3 Replicas), Mail (2 Replicas), 
and Postgresql (1 Replica).

Five services - five ClustersIP for Authentication, API, Mail, Client and Postgresql.

One Ingress - ingress-nginx server that is responsible for providing external accessibility to the application by acting as the gateway for incoming requests from users outside the Kubernetes cluster. The Ingress also routes to Client ClusterIP service, API ClusterIP, and Authentication ClusterIP.

One PVC with ReadWriteMany Postgresql for staying stateful DB even if the cluster, pod, or DB is crushed.

CI/CD: the application uses Travis CI. The CI/CD process includes running tests,
building Docker images, pushing them to Docker Hub, and deploying the cluster to GKE (Google Kubernetes Engine).


Development: Using Docker and Docker Compose with volumes for real-time updates during development.
