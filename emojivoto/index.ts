import * as k8s from "@pulumi/kubernetes";
import * as cluster from "../cluster";

const namespace = new k8s.core.v1.Namespace('emojivoto', {
  metadata: {
    name: 'emojivoto',
  },
}, { provider: cluster.provider })

export const emojiServiceAcct = new k8s.core.v1.ServiceAccount('emoji', {
  metadata: {
    name: 'emoji',
    namespace: namespace.metadata.name,
  }
}, { provider: cluster.provider, dependsOn: namespace });

export const votingServiceAcct = new k8s.core.v1.ServiceAccount('voting', {
  metadata: {
    name: 'voting',
    namespace: namespace.metadata.name,
  },
}, { provider: cluster.provider, dependsOn: namespace });

export const webServiceAcct = new k8s.core.v1.ServiceAccount('web', {
  metadata: {
    name: 'web',
    namespace: namespace.metadata.name,
  },
}, { provider: cluster.provider, dependsOn: namespace });

export const emojiService = new k8s.core.v1.Service('emoji', {
  metadata: {
    name: 'emoji',
    namespace: namespace.metadata.name,
    annotations: {
      'a8r.io/description': 'gRPC API for voting and leaderboard',
      'a8r.io/owner': "@cakuros",
      // Opens slack and shows Daniel Bryant's slack profile
      'a8r.io/chat': 'https://datawire.slack.com/team/U8SPRLSQK',
      // Issues page on application repository
      'a8r.io/bugs': "https://github.com/a8r-se/sol-eng-02-emojivoto/issues",
      // Goes to Ambassador Labs docs: Log levels and debugging
      'a8r.io/logs': 'https://www.getambassador.io/docs/edge-stack/latest/topics/running/running/#log-levels-and-debugging',
      // Goes to the Ambassdor Labs docs homepage
      'a8r.io/documentation': 'https://se02.mturner.k736.net/docs/',
      // Emojivoto repository
      'a8r.io/repository': 'https://github.com/a8r-se/sol-eng-02-emojivoto',
      // Ambassador Labs Support Portal Login Page
      'a8r.io/support': 'https://support.datawire.io/hc/en-us',
      // Ambassador docs debugging page
      'a8r.io/runbook': 'https://www.getambassador.io/docs/latest/topics/running/debugging/',
      // Opens Ambassador Docs page "Incident response in Cloud Native World"
      'a8r.io/incidents': 'https://www.getambassador.io/docs/cloud/latest/service-catalog/concepts/ir/#incident-response-in-the-cloud-native-world',
      // Jaeger Trace Boutique App.  Frontend to Shipping & Product Catalog
      'a8r.io/uptime': 'https://monitoring.se02.mturner.k736.net/jaeger/trace/98ab4d0fa605c2f391340c299bfe2ef0',
      // Login before presenting. In most cases login is cached and not required each time. Username = admin, PW = admin
      'a8r.io/performance': 'https://monitoring.se02.mturner.k736.net/grafana/d/R_NuxHVWk/ambassador-dashboard?refresh=1m&orgId=1',
      'a8r.io/dependencies': 'None',
    },
  },
  spec: {
    selector: {
      'app.kubernetes.io/name': 'emoji',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
    ports: [
      {
        name: 'grpc',
        port: 8080,
        targetPort: 'grpc',
        appProtocol: 'grpc',
      },
      {
        name: 'prom',
        port: 8801,
        targetPort: 8801,
        appProtocol: 'http',
      }
    ]
  }
}, { provider: cluster.provider, dependsOn: [namespace, emojiServiceAcct] });

export const emojiDeployment = new k8s.apps.v1.Deployment('emoji', {
  metadata: {
    name: 'emoji',
    namespace: namespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'emoji',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'emoji',
        'app.kubernetes.io/part-of': 'emojivoto',
      },
    },
    template: {
      metadata: {
        labels: {
          'app.kubernetes.io/name': 'emoji',
          'app.kubernetes.io/part-of': 'emojivoto',
        },
      },
      spec: 
      {
        serviceAccountName: emojiServiceAcct.metadata.name,
        containers: [
          {
            name: 'emoji-svc',
            image: 'docker.l5d.io/buoyantio/emojivoto-emoji-svc:v11',
            env: [
              {
                name: 'GRPC_PORT',
                value: '8080',
              },
              {
                name: 'PROM_PORT',
                value: '8801',
              },
            ],
            ports: [
              {
                containerPort: 8080,
                name: 'grpc',
              },
              {
                containerPort: 8801,
                name: 'prom',
              },
            ],
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
          },
        ],
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace, emojiServiceAcct] });

export const votingService = new k8s.core.v1.Service('voting', {
  metadata: {
    name: 'voting',
    namespace: namespace.metadata.name,
    annotations: {
      'a8r.io/description': 'gRPC API for voting and leaderboard',
      'a8r.io/owner': "@cakuros",
      // Opens slack and shows Daniel Bryant's slack profile
      'a8r.io/chat': 'https://datawire.slack.com/team/U8SPRLSQK',
      // Issues page on application repository
      'a8r.io/bugs': "https://github.com/a8r-se/sol-eng-02-emojivoto/issues",
      // Goes to Ambassador Labs docs: Log levels and debugging
      'a8r.io/logs': 'https://www.getambassador.io/docs/edge-stack/latest/topics/running/running/#log-levels-and-debugging',
      // Goes to the Ambassdor Labs docs homepage
      'a8r.io/documentation': 'https://se02.mturner.k736.net/docs/',
      // Emojivoto repository
      'a8r.io/repository': 'https://github.com/a8r-se/sol-eng-02-emojivoto',
      // Ambassador Labs Support Portal Login Page
      'a8r.io/support': 'https://support.datawire.io/hc/en-us',
      // Ambassador docs debugging page
      'a8r.io/runbook': 'https://www.getambassador.io/docs/latest/topics/running/debugging/',
      // Opens Ambassador Docs page "Incident response in Cloud Native World"
      'a8r.io/incidents': 'https://www.getambassador.io/docs/cloud/latest/service-catalog/concepts/ir/#incident-response-in-the-cloud-native-world',
      // Jaeger Trace Boutique App.  Frontend to Shipping & Product Catalog
      'a8r.io/uptime': 'https://monitoring.se02.mturner.k736.net/jaeger/trace/98ab4d0fa605c2f391340c299bfe2ef0',
      // Login before presenting. In most cases login is cached and not required each time. Username = admin, PW = admin
      'a8r.io/performance': 'https://monitoring.se02.mturner.k736.net/grafana/d/R_NuxHVWk/ambassador-dashboard?refresh=1m&orgId=1',
      'a8r.io/dependencies': 'None',
    },
  },
  spec: {
    selector: {
      'app.kubernetes.io/name': 'voting',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
    ports: [
      {
        name: 'grpc',
        port: 8080,
        targetPort: 'grpc',
        appProtocol: 'grpc',
      },
      {
        name: 'prom',
        port: 8801,
        targetPort: 'prom',
        appProtocol: 'http',
      },
    ],
  },
}, { provider: cluster.provider, dependsOn: [namespace, votingServiceAcct] })

export const votingDeployment = new k8s.apps.v1.Deployment('voting', {
  metadata: {
    name: 'voting',
    namespace: 'emojivoto',
    labels: {
      'app.kubernetes.io/name': 'voting',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'voting',
        'app.kubernetes.io/part-of': 'emojivoto',
      }
    },
    template: {
      metadata: {
        labels: {
          'app.kubernetes.io/name': 'voting',
          'app.kubernetes.io/part-of': 'emojivoto',
        },
      },
      spec: {
        serviceAccountName: votingServiceAcct.metadata.name,
        containers: [
          {
            name: 'voting',
            image: 'docker.l5d.io/buoyantio/emojivoto-voting-svc:v11',
            env: [
              {
                name: 'GRPC_PORT',
                value: '8080',
              },
              {
                name: 'PROM_PORT',
                value: '8801',
              },
            ],
            ports: [
              {
                containerPort: 8080,
                name: 'grpc',
              },
              {
                containerPort: 8801,
                name: 'prom',
              },
            ],
            resources: {
              requests: {
                cpu: '100m',
                memory: '128Mi',
              },
              limits: {
                cpu: '500m',
                memory: '256Mi',
              },
            },
          },
        ],
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace, votingServiceAcct] })

export const webService = new k8s.core.v1.Service('web', {
  metadata: {
    name: 'web',
    namespace: namespace.metadata.name,
    annotations: {
      'a8r.io/description': 'Web frontend service for voting on emojis.  Uses React.',
      'a8r.io/owner': "@cakuros",
      // Opens slack and shows Daniel Bryant's slack profile
      'a8r.io/chat': 'https://datawire.slack.com/team/U8SPRLSQK',
      // Issues page on application repository
      'a8r.io/bugs': "https://github.com/a8r-se/sol-eng-02-emojivoto/issues",
      // Goes to Ambassador Labs docs: Log levels and debugging
      'a8r.io/logs': 'https://www.getambassador.io/docs/edge-stack/latest/topics/running/running/#log-levels-and-debugging',
      // Goes to the Ambassdor Labs docs homepage
      'a8r.io/documentation': 'https://se02.mturner.k736.net/docs/',
      // Emojivoto repository
      'a8r.io/repository': 'https://github.com/a8r-se/sol-eng-02-emojivoto',
      // Ambassador Labs Support Portal Login Page
      'a8r.io/support': 'https://support.datawire.io/hc/en-us',
      // Ambassador docs debugging page
      'a8r.io/runbook': 'https://www.getambassador.io/docs/latest/topics/running/debugging/',
      // Opens Ambassador Docs page "Incident response in Cloud Native World"
      'a8r.io/incidents': 'https://www.getambassador.io/docs/cloud/latest/service-catalog/concepts/ir/#incident-response-in-the-cloud-native-world',
      // Jaeger Trace Boutique App.  Frontend to Shipping & Product Catalog
      'a8r.io/uptime': 'https://monitoring.se02.mturner.k736.net/jaeger/trace/98ab4d0fa605c2f391340c299bfe2ef0',
      // Login before presenting. In most cases login is cached and not required each time. Username = admin, PW = admin
      'a8r.io/performance': 'https://monitoring.se02.mturner.k736.net/grafana/d/R_NuxHVWk/ambassador-dashboard?refresh=1m&orgId=1',
      'a8r.io/dependencies': 'emojivoto.emoji, emojivoto.voting',
    },
  },
  spec: {
    ports: [
      {
        name: 'http',
        port: 80,
        protocol: 'TCP',
        targetPort: 'http',
        appProtocol: 'http',
      },
    ],
    selector: {
      'app.kubernetes.io/name': 'web',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace, webServiceAcct] })

export const webDeployment = new k8s.apps.v1.Deployment('web', {
  metadata: {
    name: 'web',
    namespace: namespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'web',
      'app.kubernetes.io/part-of': 'emojivoto',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'web',
        'app.kubernetes.io/part-of': 'emojivoto',
      },
    },
    template: {
      metadata: {
        annotations: {
          'telepresence.getambassador.io/inject-traffic-agent': 'enabled',
          'telepresence.getambassador.io/inject-service-name': 'web',
        },
        labels: {
          'app.kubernetes.io/name': 'web',
          'app.kubernetes.io/part-of': 'emojivoto',
        },
      },
      spec: {
        serviceAccountName: webServiceAcct.metadata.name,
        containers: [
          {
            name: 'web',
            image: 'docker.l5d.io/buoyantio/emojivoto-web:v11',
            env: [
              {
                name: 'WEB_PORT',
                value: '8080',
              },
              {
                name: 'EMOJISVC_HOST',
                value: 'emoji.emojivoto:grpc',
              },
              {
                name: 'VOTINGSVC_HOST',
                value: 'voting.emojivoto:grpc',
              },
              {
                name: 'INDEX_BUNDLE',
                value: 'dist/index_bundle.js',
              },
            ],
            ports: [
              {
                containerPort: 8080,
                name: 'http',
              },
            ],
            resources: {
              requests: {
                cpu: '100m',
                memory: '128Mi',
              },
              limits: {
                cpu: '500m',
                memory: '256Mi',
              },
            }
          },
        ]
      }
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace, webServiceAcct] })

export const votBotDeployment = new k8s.apps.v1.Deployment('vote-bot', {
  metadata: {
    name: 'vote-bot',
    namespace: namespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'vote-bot',
      'apply.kubernetes.io/part-of': 'emojivoto',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'vote-bot',
        'app.kubernetes.io/part-of': 'emojivoto',
      },
    },
    template: {
      metadata: {
        labels: {
          'app.kubernetes.io/name': 'vote-bot',
          'app.kubernetes.io/part-of': 'emojivoto',
        },
      },
      spec: {
        containers: [
          {
            name: 'vote-bot',
            image: 'docker.l5d.io/buoyantio/emojivoto-web:v11',
            command: [
              'emojivoto-vote-bot',
            ],
            env: [
              {
                name: 'WEB_HOST',
                value: 'web.emojivoto:80',
              },
            ],
            resources: {
              requests: {
                cpu: '10m',
                memory: '128Mi',
              },
              limits: {
                cpu: '50m',
                memory: '256Mi',
              },
            },
          },
        ],
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace, webDeployment] })