import * as k8s from '@pulumi/kubernetes'

export const provider = new k8s.Provider('ckurosawa@ckuro-public-cluster.us-west-2.eksctl.io', {
  kubeconfig: '~/.kube/config',
  cluster: 'ckuro-public-cluster.us-west-2.eksctl.io',
  context: 'ckurosawa@ckuro-public-cluster.us-west-2.eksctl.io'
})