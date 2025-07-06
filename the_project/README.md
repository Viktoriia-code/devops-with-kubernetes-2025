# Exercise 1.2 - The project (todo app), step 1

This is a simple web server application for Kubernetes exercise 1.2.

## Task
Create a web server that outputs "Server started in port NNNN" when it is started and deploy it into your Kubernetes cluster.

## Docker Image

The Docker image is available at:  
[`https://hub.docker.com/r/vikikone/todo-app`](https://hub.docker.com/r/vikikone/todo-app)

Tag used: `vikikone/todo-app:v1`

## Implementation Steps
1. Created the Node.js app with Dockerfile
2. Deleted the previous cluster:
```
k3d cluster delete
```
3. Created a Kubernetes cluster using `k3d`:
```
k3d cluster create -a 2
kubectl cluster-info
k3d kubeconfig get k3s-default
kubectl config use-context k3d-k3s-default
```
4. Built the Docker image and pushed the image to Docker Hub:
```
docker build -t vikikone/todo-app:v1 .
docker push vikikone/todo-app:v1
```
5. Deployed the app to the k3d Kubernetes cluster:
```
kubectl create deployment todo-app --image=vikikone/todo-app:v1
```
6. Set the environment variable PORT 8080:
```
kubectl set env deployment/todo-app PORT=8080
```
7. Verified that the app is running:
```
kubectl logs <pod-name>
```
You should see: `Server started in port 8080`
