import React from 'react'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'

const TermsAndConditions = () => {
  return (
    <Box maxW={{ base: '100%', md: '4xl' }} mx="auto" p={6} shadow="md" borderRadius="lg">
      <Heading as="h1" size="xl" mb={4}>
        Termes et Conditions
      </Heading>
      <Text mb={2}>
        Bienvenue sur notre plateforme de vente en ligne. En utilisant notre application, vous acceptez les termes et
        conditions suivants.
      </Text>

      <Stack gap={4}>
        <Box>
          <Heading as="h2" size="lg">
            1. Objet
          </Heading>
          <Text>
            Ces conditions générales régissent l'utilisation de notre application et la relation entre les vendeurs et
            les acheteurs.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            2. Inscription et Compte
          </Heading>
          <Text>
            Vous devez créer un compte pour accéder à certains services. Vous êtes responsable de la confidentialité de
            vos identifiants.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            3. Produits et Commandes
          </Heading>
          <Text>
            Les vendeurs sont responsables des produits qu'ils proposent. Toute commande est définitive après
            confirmation du paiement.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            4. Paiements et Sécurité
          </Heading>
          <Text>
            Nous utilisons des solutions de paiement sécurisées. Vos informations bancaires ne sont pas stockées sur
            notre plateforme.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            5. Retours et Remboursements
          </Heading>
          <Text>
            Les retours sont possibles sous certaines conditions. Consultez notre politique de remboursement pour plus
            de détails.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            6. Responsabilités
          </Heading>
          <Text>
            Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de notre
            application.
          </Text>
        </Box>
      </Stack>

      <Heading as="h1" size="xl" mt={6}>
        Mentions Légales
      </Heading>

      <Stack gap={4}>
        <Box>
          <Heading as="h2" size="lg">
            1. Éditeur du site
          </Heading>
          <Text>
            Nom de l'entreprise : [Nom de l'entreprise] <br />
            Adresse : [Adresse complète] <br />
            Email : contact@[nomdomaine].com <br />
            Numéro SIRET : [Numéro SIRET]
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            2. Hébergement
          </Heading>
          <Text>
            Hébergeur : [Nom de l'hébergeur] <br />
            Adresse : [Adresse de l'hébergeur] <br />
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            3. Propriété intellectuelle
          </Heading>
          <Text>
            Tous les contenus présents sur notre application sont protégés par le droit d'auteur. Toute reproduction est
            interdite sans autorisation préalable.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            4. Données personnelles
          </Heading>
          <Text>
            Nous respectons votre vie privée et vos données personnelles. Consultez notre politique de confidentialité
            pour en savoir plus.
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default TermsAndConditions
