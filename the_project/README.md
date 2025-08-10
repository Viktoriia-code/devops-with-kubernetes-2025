# Exercise 1.6 - The project (todo app)

## Task
Use a NodePort Service to enable access to the project.

## Docker Image

The Docker image is available at:  
[`https://hub.docker.com/r/vikikone/todo-app`](https://hub.docker.com/r/vikikone/todo-app)

Tag used: `vikikone/todo-app:v1.5`

## Implementation Steps
1. The Docket image was built and pushed previously.
2. Deleted the previous cluster:
```
k3d cluster delete
```
3. Created `service.yaml` file at the folder `manifests`
```
apiVersion: v1
kind: Service
metadata:
  name: the-project
spec:
  type: NodePort
  selector:
    app: the-project
  ports:
    - name: http
      nodePort: 30080
      protocol: TCP
      port: 3004
      targetPort: 3001
```
4. Created a Kubernetes cluster:
```
k3d cluster create --port 3001:30080@agent:0 -p 3000:80@loadbalancer --agents 2
```
5. Deployed the app to the k3d Kubernetes cluster:
```
kubectl create deployment todo-app --image=vikikone/todo-app:v1.5
```
6. Applied declarative configuration with YAML
```
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
```

You can now open this URL in your browser to access the app: http://localhost:3001/api/todos. 

This will show the API response from your application running `outside` the Kubernetes cluster.
