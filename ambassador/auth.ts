import * as ambassadorCRDs from '../crds/ambassador'
import * as ambassador from '../ambassador'
import config from '../config'

export const googleFilter = new ambassadorCRDs.getambassador.v3alpha1.Filter('google', {
    metadata: {
        name: 'google',
        namespace: ambassador.ambassadorNamespace.metadata.name,
    },
    spec: {
        'OAuth2': {
            authorizationUrl: 'https://accounts.google.com',
            protectedOrigins: [{
                origin: 'https://edgey.kubecon.k736.net'
            }],
            clientID: config.requireSecret('googleOauthClientId'),
            secret: config.requireSecret('googleOauthSecret'),
        }
    }
})

export const googleFilterPolicy = new ambassadorCRDs.getambassador.v3alpha1.FilterPolicy('google', {
    metadata: {
        name: 'google',
        namespace: ambassador.ambassadorNamespace.metadata.name,
    },
    spec: {
        rules: [
            {
                host: 'edgey.kubecon.k736.net',
                path: '/',
                filters: [
                    {
                        name: 'google'
                    }
                ]
            }
        ]
    }
})