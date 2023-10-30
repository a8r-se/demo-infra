import * as cluster from './cluster'
import * as ambassador from './ambassador'
import * as ratelimiter from './ambassador/ratelimit'
import * as waf from './ambassador/waf'
import * as auth from './ambassador/auth'
import * as edgey from './edgey-corp'
import * as telepresence from './traffic-manager'
import * as emojivoto from './emojivoto'
import * as xss from './xss'

cluster.provider
ambassador.chart
ambassador.k8sEndpointResolver
ambassador.httpListener
ambassador.httpsListener
ambassador.wildcardHost
ratelimiter.voteRateLimiter
waf.waf
waf.wafPolicy
edgey.dataprocessingDeployment
edgey.dataprocessingService
edgey.verylargejavaService
edgey.verylargejavaDeployment
edgey.verylargedatastoreDeployment
edgey.verylargedatastoreService
edgey.dataprocessingDeployment
edgey.edgeyHost
edgey.verylargejavaserviceMapping
auth.googleFilter
auth.googleFilterPolicy
telepresence.chart
emojivoto.emojiDeployment
emojivoto.votingDeployment
emojivoto.webDeployment
emojivoto.voteBotDeployment
xss.xssService
xss.xssDeployment
xss.xssMapping
