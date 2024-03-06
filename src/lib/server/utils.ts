import { SECRET_RATELIMIT_KEY } from '$env/static/private';
import * as jose from 'jose';
import { RateLimiter } from "sveltekit-rate-limiter/server";

export const blacklistedRegexes = ["f(@|a)gg(o|0)t","n(i|!)gg(3|a|e|@)r?"]

export const limiter = new RateLimiter({
    // A rate is defined as [number, unit]
    IP: [3, 'h'], // IP address limiter
    IPUA: [4, 'h'], // IP + User Agent limiter
    cookie: {
      // Cookie limiter
      name: 'rl', // Unique cookie name for this limiter
      secret: SECRET_RATELIMIT_KEY,
      rate: [5, 'h'],
      preflight: true // Require preflight call (see load function)
    }
  });

export async function veirfyJWT(jwt: string): Promise<{success: boolean, payload: jose.JWTPayload | null}>  {
    if (!jwt) {
        return {success: false, payload: null};
    }
    let payload;
    try {
        let temp = await jose.jwtVerify(jwt.toString(), new TextEncoder().encode(process.env.JWT_SECRET));
        payload = temp.payload;
        if (payload.exp && payload.exp < Date.now() / 1000) {
            return {success: false, payload: null};
        }
    } catch (e) {
        if (e instanceof jose.errors.JWSSignatureVerificationFailed) {
            return {success: false, payload: null};
        } else {
            return {success: false, payload: null};
        }
    }
    if (!payload.email) {
        return {success: false, payload: null};
    }
    return {success: true, payload: payload};
}