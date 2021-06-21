Before we work with Deployments, we'll go over the basics of ReplicaSets. A ReplicaSet will ensure that the desired number of replicas of each Pod are up and running. Any time a Pod goes down, the ReplicaSet will deploy a new one to maintain high availability.

Now inspect the file `cat ./resources/vue-rs.yaml`{{execute}}.

It should look familiar to the `Pod` resource. We do have a few additions. These additions are what configure our ReplicaSet.

The biggest additions are `replicas: 5` and `selector`. The first component configures the total number of replicas of the Pod should be active at all times. The `selector` matches a set of constraints to identify Pods to represent. In this case, the ReplicaSet will track Pods with the label `app=vue`.

We can deploy this ReplicaSet the same way we did Pods:

`kubectl create -f ./resources/vue-rs.yaml`{{execute}}

Now watch Kubernets create 5 `vue` Pods based on the specification in the `vue-rs.yaml` file.

`kubectl get po --watch`{{execute}}

Wait for the pods to be created. You can press `CTRL-C` to stop watching.

Inspect the `ReplicaSet`.

NOTE: `rs` is shorthand for `ReplicaSet`

`kubectl describe rs vue-rs`{{execute interrupt}}

Now modify the `ReplicaSet` to instantiate 5 pods by changing the `replicas: 3` value.

`kubectl edit rs vue-rs`{{execute}}

With `edit`, you can live edit the configuration of the resource in Kubernetes. However, it will not edit the underlying Manifest file representing the object.

# Scaling

In the last step you scaled up the `vue-rs` ReplicaSet to 5 pods by editing the spec file. Those changes were automatically applied.

# Manual Scaling

To manually scale a ReplicaSet up or down, use the **`scale`** command. Scale the `vue` pods *down* to 2 with the command:

`kubectl scale rs vue-rs --replicas=2`{{execute}}

You can verify that 3 of the 5 `vue` instances have been terminated:

`kubectl get pods`{{execute}}

or watch them until they finish

`kubectl get po --watch`{{execute}}

Of course, the ideal way to do this is to update our Manifest to reflect these changes.

# AutoScaling

Kubernetes provides native autoscaling of your Pods. However, `kube-scheduler` might not be able to schedule additional Pods if your cluster is under high load. In addition, if you have a limited set of compute resources, autoscaling Pods can have severe consequences, unless your worker nodes can automatically scale as well (e.g. AWS autoscaling groups).

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-scaler
spec:
  scaleTargetRef:
    kind: ReplicaSet
    name: vue-rs
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
```

To see all the `autoscale` options:

`kubectl autoscale --help`{{execute interrupt}}

It is also possible to automatically generate a config file, which we've seen before. The command to output a YAML config looks like this:

`kubectl autoscale rs vue-rs --max=10 --min=3 --cpu-percent=50 --dry-run=true -o=yaml`{{execute}}

Note `--dry-run=true`, this means that Kubernetes will not apply the desired state changes to our cluster. However, we provided it with `-o=yaml`, which means output the configuration as YAML. This lets us easily generate a Manifest.

*Tip `--dry-run` with `-o=yaml` is an excellent way to generate configurations!*

We've provided this content in `./resources/hpa-vue.yaml`.

Now actually apply the configuration: `kubectl create -f ./resources/hpa-vue.yaml`{{execute}}

At this point, we have a ReplicaSet managing the vue Pods, with Horizontal Pod Autoscaling configured. Let's clean up our environment:

`kubectl delete -f ./resources/hpa-vue.yaml`{{execute}}

`kubectl delete -f ./resources/vue-rs.yaml`{{execute}}
