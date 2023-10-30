import * as k8s from "@pulumi/kubernetes";
import * as cluster from "../cluster";
import * as aws from '@pulumi/aws';
import config from '../config'
import * as ambassador from '../ambassador'
import * as ambassadorCRDs from '../crds/ambassador'
import * as emoji from '../emojivoto'

const namespace = new k8s.core.v1.Namespace('xss', {
  metadata: {
    name: 'xss',
  },
}, { provider: cluster.provider })

export const xssService = new k8s.core.v1.Service('xss', {
  metadata: {
    name: 'xss',
    namespace: namespace.metadata.name,
  },
  spec: {
    selector: {
      'app.kubernetes.io/name': 'xss',
      'app.kubernetes.io/part-of': 'xss',
    },
    ports: [
      {
        name: 'http',
        port: 5000,
        targetPort: 5000,
        appProtocol: 'http'
      },
    ]
  }
}, { provider: cluster.provider, dependsOn: [namespace] });

export const xssDeployment = new k8s.apps.v1.Deployment('xss', {
  metadata: {
    name: 'xss',
    namespace: namespace.metadata.name,
    labels: {
      'app.kubernetes.io/name': 'xss',
      'app.kubernetes.io/part-of': 'xss',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        'app.kubernetes.io/name': 'xss',
        'app.kubernetes.io/part-of': 'xss',
      },
    },
    template: {
      metadata: {
        labels: {
          'app.kubernetes.io/name': 'xss',
          'app.kubernetes.io/part-of': 'xss',
        },
      },
      spec: 
      {
        containers: [
          {
            name: 'xss',
            image: 'thedevelopnik/xss-demo:2',
            ports: [
              {
                containerPort: 5000,
                name: 'http',
              },
              ],
          },
        ],
      },
    },
  },
}, { provider: cluster.provider, dependsOn: [namespace] });

export const xssDomain = new aws.route53.Record('waf', {
  zoneId: config.require('route53ZoneId'),
  name: config.require('xssHostPrefix'),
  type: 'A',
  records: [ambassador.publicIp],
  ttl: 300,
  allowOverwrite: true,
}, { dependsOn: [ambassador.chart, ambassador.apiext] })

export const xssHost = new ambassadorCRDs.getambassador.v3alpha1.Host('xss-host', {
  metadata: {
    name: 'xss-host',
    namespace: namespace.metadata.name,
  },
  spec: {
    acmeProvider: {
      email: config.require('email'),
    },
    hostname: xssDomain.fqdn,
  }
}, { provider: cluster.provider, dependsOn: [xssDomain, ambassador.apiext] })

export const xssMapping = new ambassadorCRDs.getambassador.v3alpha1.Mapping('xss-mapping', {
  metadata: {
    name: 'xss-mapping',
    namespace: namespace.metadata.name,
  },
  spec: {
    hostname: xssDomain.fqdn,
    prefix: '/',
    service: 'xss.xss:5000',
  }
}, { provider: cluster.provider, dependsOn: [emoji.emojiHost, emoji.emojiDomain, ambassador.apiext] })