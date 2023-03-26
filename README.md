# "Official" Demo infrastructure for Emojivoto and Quote

## Requirements

- `pulumi` CLI, tested with Pulumi CLI v3.58.0
- `kubectl` CLI.  Requires v1.21 or later.
- `aws` CLI.  Must also be logged on the CLI in with the account that can access the target Route53 hosted zone.

## Getting Started

Start by creating and switching to a new stack.  Please identify your stack with a username so we know who's stack is whose :).  

`pulumi stack init <stack-name>`
`pulumi stack select <stack-name>`

After creating the new stack, set up the following config values.  Set with `pulumi config <key> <value>`.

- `providerKubeconfigPath`: Filepath of your kubeconfig.  If you're not sure, it's probably `~/.kube/config`.
- `providerCluster`: Name of the cluster.  If using Kubeception, this is the name you put in to create the kluster.
- `providerContext`: Name of the kubecontext.  If using Kubeception, this is the same as the cluster name.  If you're not sure, use `kubectl config current-context`.
- `email`: Email address for ACME config.
- `route53ZoneId`: This is the Hosted zone ID of your Route53 domain.  Go to your Route53 domain, click the drop-down of the Hosted zone details, and copy the "Hosted zone ID" value.
- `hostPrefix`: The subdomain of your Route53 zone you want to use.

Requires the following secret value.  Set with `pulumi config --secret <key> <value>`

- `cloudConnectToken`: The un-base64 encoded cloud connect token value from Ambassador Cloud.  Go to `https://app.getambassador.io/cloud/clusters`, login and select "Add Cluster:Namespace" and create a cloud token.

Finally, run `pulumi up` to pull up your new Edge Stack + TP stack!

## Updating product versions

TBD
