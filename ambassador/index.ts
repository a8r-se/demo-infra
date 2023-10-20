import * as k8s from "@pulumi/kubernetes";
import * as helm from "@pulumi/kubernetes/helm";
import * as cluster from "../cluster";
import * as ambassadorCRDs from "../crds/ambassador/index";
import config from "../config";

export const ambassadorNamespace = new k8s.core.v1.Namespace('ambassador', {
  metadata: {
    name: 'ambassador',
  },
}, { provider: cluster.provider })

export const edgeStackCRDs = new k8s.yaml.ConfigFile('edge-stack-3-crds', {
  file: './tools/aes-crds.yaml'
}, { provider: cluster.provider })

// At some point convert this to proper pulumi format - ckuro
export const apiext = new k8s.yaml.ConfigFile('emissary-apiext', {
  file: './tools/aes-apiext.yaml'
}, { provider: cluster.provider })

// We are creating the Redis manually so we can add appropriate labels and pod annotations
export const edgeStackRedisService = new k8s.core.v1.Service('edge-stack-redis', {
  metadata: {
    name: 'edge-stack-redis',
    namespace: ambassadorNamespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'edge-stack-redis',
      'app.kubernetes.io/part-of': 'edge-stack',
      'app.kubernetes.io/instance': 'edge-stack',
      'product': 'aes',
    },
    annotations: {
      'a8r.io/bugs': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/chat': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/dependencies': 'None',
      'a8r.io/documentation': 'https://github.com/a8r-se/demo-infra',
      'a8r.io/incidents': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/logs': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/owner': '@cakuros',
      'a8r.io/performance': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/repository': 'https://github.com/a8r-se/demo-infra',
      'a8r.io/runbook': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/support': 'https://github.com/a8r-se/demo-infra/issues',
      'a8r.io/uptime': 'https://github.com/a8r-se/demo-infra/issues',
    },
  },
  spec: {
    type: 'ClusterIP',
    ports: [
      {
        port:  6379,
        protocol: 'TCP',
        name: 'tcp',
        targetPort: 'tcp',
      }
    ],
    selector: {
      'app.kubernetes.io/name': 'edge-stack-redis',
      'app.kubernetes.io/instance': 'edge-stack',
    }
  }
}, { provider: cluster.provider, dependsOn: ambassadorNamespace })

export const edgeStackRedisDeployment = new k8s.apps.v1.Deployment('edge-stack-redis', {
  metadata: {
    name: 'edge-stack-redis',
    namespace: ambassadorNamespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'edge-stack-redis',
      'app.kubernetes.io/part-of': 'edge-stack',
      'app.kubernetes.io/instance': 'edge-stack',
      'product': 'aes',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'edge-stack-redis',
        'app.kubernetes.io/instance': 'edge-stack',
      },
    },
    template: {
      metadata: {
        annotations: {
          'sidecar.istio.io/inject': 'false',
        },
        labels: {
          'app.kubernetes.io/name': 'edge-stack-redis',
          'app.kubernetes.io/instance': 'edge-stack',
        },
      },
      spec: {
        containers: [
          {
            name: 'redis',
            image: 'redis:7.0.8',
            imagePullPolicy: 'IfNotPresent',
            resources: {
              limits: {
                cpu: '100m',
                memory: '256Mi',
              },
              requests: {
                cpu: '50m',
                memory: '128Mi',
              },
            },
            ports: [
              {
                containerPort: 6379,
                name: 'tcp',
                protocol: 'TCP',
              }
            ],
          },
        ],
        restartPolicy: 'Always'
      },
    }
  },
}, { provider: cluster.provider, dependsOn: ambassadorNamespace })


export const chart = new helm.v3.Chart('edge-stack',{
  chart: 'edge-stack',
  version: '8.7.0',
  namespace: ambassadorNamespace.metadata.name,
  fetchOpts: {
    repo: 'https://s3.amazonaws.com/datawire-static-files/charts',
  },
  values: {
    'license-key': {
      createSecret: false,
    },
    createDevPortalMappings: false,
    redis: {
      // Redis is set to FALSE so we can create it separately
      'create': false,
    },
    'emissary-ingress': {
      replicaCount: 1,
      env: {
        'REDIS_URL': 'edge-stack-redis:6379',
        'AES_LOG_LEVEL': 'debug',
        'POLL_EVERY_SECS': '0',
        'AMBASSADOR_ENVOY_BASE_ID': '4',
        'AMBASSADOR_ENVOY_API_VERSION': 'V3',
        'AMBASSADOR_RATELIMIT_PREVIEW': 'true',
        //'AMBASSADOR_ISTIO_SECRET_DIR': '/etc/istio-certs',
      },
      service: {
        annotations: {
          'a8r.io/bugs': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/chat': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/dependencies': 'edge-stack-redis.ambassador, edge-stack-agent.ambassador',
          'a8r.io/documentation': 'https://github.com/a8r-se/demo-infra',
          'a8r.io/incidents': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/logs': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/owner': '@cakuros',
          'a8r.io/performance': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/repository': 'https://github.com/a8r-se/demo-infra',
          'a8r.io/runbook': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/support': 'https://github.com/a8r-se/demo-infra/issues',
          'a8r.io/uptime': 'https://github.com/a8r-se/demo-infra/issues',
        },
      },
      adminService: {
        create: true,
        type: 'NodePort',
      },
      resources: {
        limits: {
          cpu: '1000m',
          memory: '600Mi',
        },
        requests: {
          cpu: '200m',
          memory: '300Mi',
        },
      },
      agent: {
        enabled: true,
        cloudConnectToken: config.requireSecret('cloudConnectToken'),
      },
      podLabels: {
        'sidecar.istio.io/inject': 'true',
      },
      podAnnotations: {
        'traffic.sidecar.istio.io/includeInboundPorts': '',
        'traffic.sidecar.istio.io/includeOutboundIPRanges': '',
        'sidecar.istio.io/inject': 'true',
        'proxy.istio.io/config': `proxyMetadata:
          OUTPUT_CERTS: /etc/istio-certs`,
        'sidecar.istio.io/userVolumeMount': '[{"name": "istio-certs", "mountPath": "/etc/istio-certs"}]',
      },
      volumes: [
        {
          name: 'istio-certs',
          emptyDir: {
            medium: 'Memory',
          }
        },
      ],
      volumeMounts: [
        {
          name: 'istio-certs',
          mountPath: '/etc/istio-certs/',
          readOnly: true,
        },
      ],
    }
  }
}, { provider: cluster.provider, dependsOn: [edgeStackCRDs, apiext, edgeStackRedisDeployment, edgeStackRedisService] })

const ambassadorSvc = chart.getResource('v1/Service', 'ambassador/edge-stack')
export const publicIp = ambassadorSvc.status.loadBalancer.ingress[0].ip

// Connector config
export const k8sEndpointResolver = new ambassadorCRDs.getambassador.v3alpha1.KubernetesEndpointResolver('endpoint', {
  metadata: {
    namespace: ambassadorNamespace.metadata.name,
    name: 'endpoint',
  },
}, { provider: cluster.provider, dependsOn: [chart, apiext] })

export const httpListener = new ambassadorCRDs.getambassador.v3alpha1.Listener('http-listener', {
  metadata: {
    name: 'http-listener',
    namespace: ambassadorNamespace.metadata.name,
  },
  spec: {
    port: 8080,
    protocol: 'HTTPS',
    securityModel: 'XFP',
    hostBinding: {
      namespace: {
        from: 'ALL',
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [chart, apiext] })

export const httpsListener = new ambassadorCRDs.getambassador.v3alpha1.Listener('https-listener', {
  metadata: {
    name: 'https-listener',
    namespace: ambassadorNamespace.metadata.name,
  },
  spec: {
    port: 8443,
    protocol: 'HTTPS',
    securityModel: 'XFP',
    hostBinding: {
      namespace: {
        from: 'ALL'
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [chart, apiext] })

export const wildcardHost = new ambassadorCRDs.getambassador.v3alpha1.Host('wildcard', {
  metadata: {
    name: 'wildcard',
    namespace: ambassadorNamespace.metadata.name,
  },
  spec: {
    acmeProvider: {
      authority: 'none',
    },
    hostname: '*',
    selector: {
      matchLabels: {
        hostname: 'wildcard'
      },
    },
    tlsSecret: {
      name: 'fallback-self-signed-cert',
    },
  },
}, { provider: cluster.provider, dependsOn: [chart, apiext] })
