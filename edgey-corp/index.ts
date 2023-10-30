import * as k8s from "@pulumi/kubernetes";
import * as cluster from "../cluster";
import config from '../config'
import * as aws from '@pulumi/aws';
import * as ambassador from '../ambassador'
import * as ambassadorCRDs from '../crds/ambassador'

const namespace = new k8s.core.v1.Namespace('edgey-corp', {
    metadata: {
      name: 'edgey-corp',
    },
  }, { provider: cluster.provider })
  
export const dataprocessingService = new k8s.core.v1.Service('dataprocessing', {
metadata: {
    name: 'dataprocessingservice',
    namespace: namespace.metadata.name,
},
spec: {
    selector: {
    'app.kubernetes.io/name': 'dataprocessingservice',
    'app.kubernetes.io/part-of': 'dataprocessingservice',
    },
    ports: [
    {
        name: 'http',
        port: 3000,
        targetPort: 3000,
        appProtocol: 'http'
    },
    ]
}
}, { provider: cluster.provider, dependsOn: [namespace] });

export const dataprocessingDeployment = new k8s.apps.v1.Deployment('dataprocessing', {
metadata: {
    name: 'dataprocessingservice',
    namespace: namespace.metadata.name,
    labels: {
    'app.kubernetes.io/name': 'dataprocessingservice',
    'app.kubernetes.io/part-of': 'dataprocessingservice',
    },
},
spec: {
    replicas: 1,
    selector: {
    matchLabels: {
        'app.kubernetes.io/name': 'dataprocessingservice',
        'app.kubernetes.io/part-of': 'dataprocessingservice',
    },
    },
    template: {
    metadata: {
        labels: {
        'app.kubernetes.io/name': 'dataprocessingservice',
        'app.kubernetes.io/part-of': 'dataprocessingservice',
        },
    },
    spec: 
    {
        containers: [
        {
            name: 'dataprocessingservice',
            image: 'docker.io/datawire/dataprocessingservice:nodejs',
            ports: [
            {
                containerPort: 3000,
                name: 'http',
            },
            ],
        },
        ],
    },
    },
},
}, { provider: cluster.provider, dependsOn: [namespace] });

export const verylargejavaService = new k8s.core.v1.Service('verylargejava', {
metadata: {
    name: 'verylargejavaservice',
    namespace: namespace.metadata.name,
},
spec: {
    selector: {
    'app.kubernetes.io/name': 'verylargejavaservice',
    'app.kubernetes.io/part-of': 'verylargejavaservice',
    },
    ports: [
    {
        name: 'http',
        port: 8080,
        targetPort: 8080,
        appProtocol: 'http'
    },
    ]
}
}, { provider: cluster.provider, dependsOn: [namespace] });

export const verylargejavaDeployment = new k8s.apps.v1.Deployment('verylargejava', {
metadata: {
    name: 'verylargejavaservice',
    namespace: namespace.metadata.name,
    labels: {
    'app.kubernetes.io/name': 'verylargejavaservice',
    'app.kubernetes.io/part-of': 'verylargejavaservice',
    },
},
spec: {
    replicas: 1,
    selector: {
    matchLabels: {
        'app.kubernetes.io/name': 'verylargejavaservice',
        'app.kubernetes.io/part-of': 'verylargejavaservice',
    },
    },
    template: {
    metadata: {
        labels: {
        'app.kubernetes.io/name': 'verylargejavaservice',
        'app.kubernetes.io/part-of': 'verylargejavaservice',
        },
    },
    spec: 
    {
        containers: [
        {
            name: 'verylargejavaservice',
            image: 'docker.io/datawire/verylargejavaservice',
            ports: [
            {
                containerPort: 8080,
                name: 'http',
            },
            ],
        },
        ],
    },
    },
},
}, { provider: cluster.provider, dependsOn: [namespace] });

export const verylargedatastoreService = new k8s.core.v1.Service('verylargedatastore', {
metadata: {
    name: 'verylargedatastore',
    namespace: namespace.metadata.name,
},
spec: {
    selector: {
    'app.kubernetes.io/name': 'verylargedatastore',
    'app.kubernetes.io/part-of': 'verylargedatastore',
    },
    ports: [
    {
        name: 'http',
        port: 8080,
        targetPort: 8080,
        appProtocol: 'http'
    },
    ]
}
}, { provider: cluster.provider, dependsOn: [namespace] });

export const verylargedatastoreDeployment = new k8s.apps.v1.Deployment('verylargedatastore', {
metadata: {
    name: 'verylargedatastore',
    namespace: namespace.metadata.name,
    labels: {
    'app.kubernetes.io/name': 'verylargedatastore',
    'app.kubernetes.io/part-of': 'verylargedatastore',
    },
},
spec: {
    replicas: 1,
    selector: {
    matchLabels: {
        'app.kubernetes.io/name': 'verylargedatastore',
        'app.kubernetes.io/part-of': 'verylargedatastore',
    },
    },
    template: {
    metadata: {
        labels: {
        'app.kubernetes.io/name': 'verylargedatastore',
        'app.kubernetes.io/part-of': 'verylargedatastore',
        },
    },
    spec: 
    {
        containers: [
        {
            name: 'verylargedatastore',
            image: 'docker.io/datawire/verylargedatastore',
            ports: [
            {
                containerPort: 8080,
                name: 'http',
            },
            ],
        },
        ],
    },
    },
},
}, { provider: cluster.provider, dependsOn: [namespace] });

export const edgeyDomain = new aws.route53.Record('edgey', {
zoneId: config.require('route53ZoneId'),
name: config.require('edgeyHostPrefix'),
type: 'A',
records: [ambassador.publicIp],
ttl: 300,
allowOverwrite: true,
}, { dependsOn: [ambassador.chart, ambassador.apiext] })

export const edgeyHost = new ambassadorCRDs.getambassador.v3alpha1.Host('edgey', {
metadata: {
    name: 'edgey',
    namespace: namespace.metadata.name,
},
spec: {
    acmeProvider: {
    email: config.require('email'),
    },
    hostname: edgeyDomain.fqdn,
}
}, { provider: cluster.provider, dependsOn: [edgeyDomain, ambassador.apiext] })

export const verylargejavaserviceMapping = new ambassadorCRDs.getambassador.v3alpha1.Mapping('verylargejavaservice-mapping', {
    metadata: {
      name: 'verylargejavaservice-mapping',
      namespace: namespace.metadata.name,
    },
    spec: {
      hostname: edgeyDomain.fqdn,
      prefix: '/',
      service: 'verylargejavaservice.edgey-corp:8080',
      timeout_ms: 60000
    }
  }, { provider: cluster.provider, dependsOn: [edgeyHost, edgeyDomain, ambassador.apiext] })