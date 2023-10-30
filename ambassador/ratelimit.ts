import * as ambassador from './index'
import * as ambassadorCRDs from '../crds/ambassador'
import * as cluster from "../cluster"

export const voteRateLimiter = new ambassadorCRDs.getambassador.v3alpha1.RateLimit('vote-rate-limiter', {
  metadata: {
    name: 'vote-rate-limit',
    namespace: ambassador.ambassadorNamespace.metadata.name,
  },
  spec: {
    domain: 'ambassador',
    limits: [{
      pattern: [{'remote_address': '*'}],
      rate: 3,
      unit: 'minute'
    }]
  },
}, { provider: cluster.provider, dependsOn: [ambassador.apiext] })

