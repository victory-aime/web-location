/** dynamic function to encrypt
 * some key we use NEXTAUTH_SECRET
 */
import Cryptr from 'cryptr';

const secretKey = process.env.NEXTAUTH_SECRET || 'my-secret-goes-here-abc-123';

console.log('key', secretKey)

// if (!secretKey) {
//   throw new Error('NEXTAUTH_SECRET is not set in environment variables.');
// }

const cryptr = new Cryptr(secretKey);

export function encrypt(text: string) {
  return cryptr?.encrypt(text);
}

export function decrypt(encryptedString: string) {
  return cryptr?.decrypt(encryptedString);
}
