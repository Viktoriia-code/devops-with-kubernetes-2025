# Exercise 1.1 - Log Output

## Task

- Create an app that generates a UUID on startup
- Print the UUID with a timestamp every 5 seconds
- Package it in Docker and push to Docker Hub
- Deploy it to Kubernetes and verify with `kubectl logs`

## Technologies

- Node.js
- Docker
- Kubernetes (k3d cluster)
- Docker Hub

## Docker Image

The Docker image is available at:  
[`https://hub.docker.com/r/vikikone/log-output`](https://hub.docker.com/r/vikikone/log-output)

Tag used: `vikikone/log-output:v1.0`

## Implementation Steps
1. Created a simple Node.js app with the command:
```
npm init -y
```

2. Created a file index.js with the app that:
   - Generates a UUID at startup
   - Logs the UUID with a timestamp every 5 seconds

3. Wrote a `Dockerfile` to containerize the app.
4. Created a Kubernetes cluster using `k3d`:
```
k3d cluster create -a 2
kubectl cluster-info
k3d kubeconfig get k3s-default
kubectl config use-context k3d-k3s-default
```
5. Built the Docker image and pushed the image to Docker Hub:
```
docker build -t log-output .
docker tag log-output vikikone/log-output:v1.0
docker push vikikone/log-output:v1.0
```
6. Deployed the app to the k3d Kubernetes cluster:
```
kubectl create deployment log-output-dep --image=vikikone/log-output:v1.0
```
7. Verified that the app is running:
```
kubectl get pods
kubectl get deployments
kubectl logs -f <pod-name>
```
