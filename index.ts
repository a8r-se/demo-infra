import * as cluster from './cluster'
import * as ambassador from './ambassador'
import * as telepresence from './traffic-manager'
import * as emojivoto from './emojivoto'

cluster.provider
ambassador.chart
ambassador.k8sEndpointResolver
ambassador.httpListener
ambassador.httpsListener
ambassador.wildcardHost
telepresence.chart
emojivoto.emojiDeployment
emojivoto.votingDeployment
emojivoto.webDeployment
emojivoto.voteBotDeployment
