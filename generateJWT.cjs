// Use this for development only
// @ts-check
const jose = require('jose');
// Make a jwt
async function a(){
    const secret = new TextEncoder().encode("dff4f2ef7b0594cc4de4275696e81c08811da7be3817f530218249c20bf37ba9");
    const alg = 'HS256';
    const jwt = await new jose.SignJWT({ email:"anthonydicker894@gmail.com" }).setProtectedHeader({ alg }).setExpirationTime('1d').sign(secret);
    console.log(jwt)
}

a()