/** dynamic function to encrypt
 * some key we use NEXTAUTH_SECRET
 */
import Cryptr from 'cryptr'

const secretKey = 'VmyYrp4sDUwly8fUk34CVvn2jvahHwxHQBokNVYhM+M='

const cryptr = new Cryptr(secretKey)

export function encrypt(text: string) {
  return cryptr?.encrypt(text)
}

export function decrypt(encryptedString: string) {
  return cryptr?.decrypt(encryptedString)
}
