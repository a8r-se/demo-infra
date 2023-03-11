import * as k8s from "@pulumi/kubernetes";
//import * as helm from "@pulumi/kubernetes/helm";
import * as cluster from "../cluster";
import * as ambassador from "../ambassador";

export const interceptCRDs = new k8s.yaml.ConfigFile('telepresence-crds', {
  file: './tools/telepresence-crds.yaml',
}, { provider: cluster.provider })

export const chart = new k8s.helm.v3.Release('traffic-manager', {
  name: 'traffic-manager',
  chart: 'telepresence',
  version: '2.11.1',
  namespace: ambassador.ambassadorNamespace.metadata.name,
  repositoryOpts: {
    repo: 'https://app.getambassador.io'
  },
  recreatePods: true,
  values: {
    image: {
      registry: 'docker.io/datawire',
      name: 'tel2',
    },
    resources: {
      limits: {
        cpu: '1',
        memory: '256Mi',
      },
      requests: {
        cpu: '100m',
        memory: '128Mi',
      },
    },
    podLabels: {
      'sidecar.istio.io/inject': 'false',
    },
    podAnnotations: {
      'sidecar.istio.io/inject': 'false',
      'consul.hashicorp.com/connect-inject': 'false',
      'linkerd.io/inject': 'disabled',
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
    },
    podSecurityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
    },
    logLevel: 'debug',
    agent: {
      appProtocolStrategy: 'http2Probe',
      resources: {
        limits: {
          cpu: '1',
          memory: '256Mi',
        },
        requests: {
          cpu: '100m',
          memory: '128Mi',
        },
        initResources: {
          limits: {
            cpu: '1',
            memory: '256Mi',
          },
          requests: {
            cpu: '100m',
            memory: '128Mi',
          },
        },
        image: {
          registry: 'docker.io/datawire',
          name: 'ambassador-telepresence-agent',
          tag: '1.13.9',
        },
      },
    },
    'ambassador-agent': {
      enabled: false,
    },
  }
}, { provider: cluster.provider, dependsOn: ambassador.ambassadorNamespace })