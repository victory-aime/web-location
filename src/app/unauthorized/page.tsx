import Link from "next/link";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Accès refusé</h1>
      <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      <Link href="/">Retour à l'accueil</Link>
    </div>
  );
}
