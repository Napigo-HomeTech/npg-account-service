import jwt from 'jsonwebtoken';
import { AppConfig } from '../configs/app-config';

const importantProperties = {
    iss: AppConfig.FIREBASE_ADMIN_CONFIG.iss,
    aud: AppConfig.FIREBASE_ADMIN_CONFIG.aud
};

/**
 *
 * @param payload
 * @returns
 */
export const createCSRFToken = (payload: any) => {
    /**
     * @step 1 validated all important properties in the payload, if its from firebase,
     * we show know what properties to be expected from the payload.
     * will also test out if the value is matching with our server's
     */
    for (const [key, value] of Object.entries(importantProperties)) {
        if (!payload.hasOwnProperty(key) || payload[key] !== value) {
            throw new Error(`some property from the firebase idtoken payload is missing or incorrect`);
        }
    }

    /**
     * @step 2 compose the claims which data derived from the
     * firebase idtoken payload
     */
    const claims = {
        user_name: payload.name,
        user_id: payload.sub,
        email: payload.email,
        email_verified: payload.email_verified,
        phone_number: payload.phone_number
    };

    /**
     * @step 3 use the above claims in the JWT token and sign with the proper secrets, shhh
     */
    const signedToken = jwt.sign(claims, AppConfig.JWT.secret ?? '', {
        issuer: AppConfig.JWT.issuer,
        keyid: AppConfig.JWT.kid,
        algorithm: AppConfig.JWT.alg as jwt.Algorithm,
        audience: AppConfig.JWT.audience,
        expiresIn: 60000,
        subject: claims.user_id
    });

    return signedToken;
};
