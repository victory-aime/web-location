import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function refreshAccessToken(token: any) {
  const resp = await axios.post(
    process.env.KEYCLOAK_CLIENT_TOKEN_URL!,
    new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token,
    }).toString(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  const refreshToken = resp.data;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}
