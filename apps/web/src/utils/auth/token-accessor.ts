import { authOptions } from '_authOptions/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { decrypt } from '../encrypt'

export async function getAccessToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    return decrypt(session.access_token)
  }
  return null
}

export async function getIdToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    const idTokenDecrypted = decrypt(session.id_token)
    return idTokenDecrypted
  }
  return null
}
