export default {
    port: 1337,
    origin: 'http://localhost:3000',
    dbUri: "mongodb://localhost:27017/BlogDb",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG83KRiIwwbOfkt1memcEEdkwrl0
extdGoMSpIUno+RHzxWXWhzv1axVwCw4qY3QSCqgRnBTkwd6cuq+i/5On0xpnzSt
JmHmNKtwzg9+gAGcdrRO+JS815WNH3qnhNIuX8k5It6FdZitWbfjxpyPHhEK4PC2
D+yCX6pKmVv75QKFAgMBAAE=
-----END PUBLIC KEY-----`,

    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgG83KRiIwwbOfkt1memcEEdkwrl0extdGoMSpIUno+RHzxWXWhzv
1axVwCw4qY3QSCqgRnBTkwd6cuq+i/5On0xpnzStJmHmNKtwzg9+gAGcdrRO+JS8
15WNH3qnhNIuX8k5It6FdZitWbfjxpyPHhEK4PC2D+yCX6pKmVv75QKFAgMBAAEC
gYAzaQVHQRkeUWASU8eVNL5Vsl9NSWoLCSvTQU/p+ZwKT6OLsI5IaBmW84DFMGA4
nPpvMe29yPRjdZgfqXufUArUtBFvTWCSslKa2nIsD5+0/+7If7rb6FN+mumPNMmZ
H77mYueom/jRDsaHvz5DclRK65adXJHtCFz/MC3eA1i8QQJBALorUpQow5isa5ci
iSNL6FSiqlwqGeZV0T8+2wfkwD9WRc3C2VCpuSJH5AA+650MVM+PSWIUzriDS1BV
rVTP2BUCQQCY7n43pjM0laZm5g4rlHXDVrwtNAELBZDWvHJyFIPdi4K+vH7TQG1X
ediBKSTi5RUE9mZgwVhuRLfl4caxGSyxAkBYjKqmlg0S3U//fwnDpCNJvmVRmSTg
jgkNEBSWWJOojJx/FiLPXysTxyYHh+YBuQ/N+dVptYPt92UnPNlI8eNRAkBxIGKP
icrxCA5aqa0rwZtHTz7N9V0cKRbWMfo6t0BAPvYNX+Q1IsB/Z+umx6e4i5r728Up
p3xhvUWHsHbJBIVRAkAkUyEMnq9u586XADs4AgxkI0uJroxqnVN9LOGI54oJ4MSb
WLkqttywn1FdJVv0Nyf1suzXs5CENNmE012kamQG
-----END RSA PRIVATE KEY-----`,


googleClientId: '244436107972-6btun1q33jcgo7g8f2ntpshb0qgabi18.apps.googleusercontent.com',
googleClientSecret: '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',
googleOauthRedirectUrl: 'http://localhost:1337/api/sessions/oauth/google',
}