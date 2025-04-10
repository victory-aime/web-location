import { authOptions } from '_/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { decrypt } from '../encrypt';

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const accessTokenDecrypted = decrypt(session.access_token);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idTokenDecrypted = decrypt(session.id_token);
    console.log(idTokenDecrypted);
    return idTokenDecrypted;
  }
  return null;
}
