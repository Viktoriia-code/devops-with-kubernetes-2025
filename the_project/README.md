# Exercise 1.6 - The project (todo app)

## Task
Use a NodePort Service to enable access to the project.

## Docker Image

The Docker image is available at:  
[`https://hub.docker.com/r/vikikone/todo-app`](https://hub.docker.com/r/vikikone/todo-app)

Tag used: `vikikone/todo-app:v1.5`

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
docker build -t vikikone/todo-app:v1.5 .
docker push vikikone/todo-app:v1.5
```
5. Deployed the app to the k3d Kubernetes cluster:
```
kubectl create deployment todo-app --image=vikikone/todo-app:v1.5
```
6. Applied declarative configuration with YAML
```
kubectl apply -f https://raw.githubusercontent.com/Viktoriia-code/devops-with-kubernetes-2025/main/the_project/manifests/deployment.yaml
```
### Connecting from outside of the cluster
7. Listed pods to find the pod the-project:
```
$ kubectl get po
NAME                              READY   STATUS    RESTARTS       AGE
the-project-8696d8d4c5-glznk      1/1     Running   0              42m
```
8. Forwarded local port 3001 to the pod’s port 3001:
```
$ kubectl port-forward the-project-8696d8d4c5-glznk 3001:3001
```
Now you can open this URL in your browser to access the app: http://localhost:3001/api/todos.
This will show the API response from your running application inside the cluster.
