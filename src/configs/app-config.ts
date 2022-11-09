export const AppConfig = {
    SERVICE: {
        name: process.env.SERVICE_NAME ?? '',
        port: process.env.SERVICE_PORT ?? ''
    },
    DATABASE: {
        NAME: process.env.DATABASE_NAME ?? '',
        URI: process.env.DATABASE_URI ?? ''
    },
    JWT: {
        issuer: process.env.JWT_ISSUER ?? '',
        secret: process.env.JWT_SECRET ?? '',
        audience: process.env.JWT_AUDIENCE ?? '',
        kid: process.env.JWT_KID ?? 'napigo-kids',
        alg: process.env.JWT_ALG ?? 'HS256'
    },
    LOGGING: {
        with_color: process.env.LOG_WITH_COLOR ?? true,
        level: process.env.LOG_LEVEL ?? 'verbose'
    }
};
