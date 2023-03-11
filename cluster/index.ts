import * as k8s from '@pulumi/kubernetes'
import config from '../config'

export const provider = new k8s.Provider('k8sProvider', {
  kubeconfig: config.require('providerKubeconfigPath'),
  cluster: config.require('providerCluster'),
  context: config.require('providerContext'),
})