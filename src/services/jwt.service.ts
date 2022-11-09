import jwt from 'jsonwebtoken';
import { AppConfig } from '../configs/app-config';

/**
 *
 * @param userId
 */
export const createJWTDevToken = async (userId: string) => {
    const payload = {
        userId: userId
    };

    const signedToken = jwt.sign(payload, AppConfig.JWT.secret ?? '', {
        issuer: AppConfig.JWT.issuer,
        keyid: AppConfig.JWT.kid,
        algorithm: AppConfig.JWT.alg as jwt.Algorithm,
        audience: AppConfig.JWT.audience,
        expiresIn: 5000,
        subject: userId
    });

    return signedToken;
};
