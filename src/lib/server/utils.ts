import * as jose from 'jose';

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