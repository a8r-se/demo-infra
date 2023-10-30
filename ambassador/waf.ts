import * as ambassadorCRDs from '../crds/ambassador/gateway'
import * as ambassador from './index'
import * as cluster from "../cluster";
import * as xss from '../xss'

export const waf = new ambassadorCRDs.v1alpha1.WebApplicationFirewall('waf', {
  metadata: {
    name: 'xss-waf',
    namespace: ambassador.ambassadorNamespace.metadata.name
  },
  spec: {
    logging: {
      onInterrupt: {
       enabled: true, 
      },
    },
    firewallRules: [{
      sourceType: 'http',
      http: {
        url: 'https://app.getambassador.io/download/waf/v1-20230825/aes-waf.conf'
      },
    }, {
      sourceType: 'http',
      http: {
        url: 'https://app.getambassador.io/download/waf/v1-20230825/crs-setup.conf'
      }
    }, {
      sourceType: 'http',
      http: {
        url: 'https://app.getambassador.io/download/waf/v1-20230825/waf-rules.conf'
      }
    }]
  },
}, { provider: cluster.provider })

export const wafPolicy = new ambassadorCRDs.v1alpha1.WebApplicationFirewallPolicy('waf-policy', {
  metadata: {
    name: 'xss-waf-policy',
    namespace: ambassador.ambassadorNamespace.metadata.name
  },
  spec: {
    rules: [{
      host: xss.xssDomain.fqdn,
      wafRef: {
        name: 'xss-waf',
        namespace: ambassador.ambassadorNamespace.metadata.name 
      }
    }]
  }
}, { provider: cluster.provider })