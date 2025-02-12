import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  useFileUpload,
  FileUploadRootProvider,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "_/components/ui/file-upload";

const MyFileUpload = () => {
  const fileUpload = useFileUpload();

  // Stockage des URLs de prévisualisation
  const [previews, setPreviews] = useState<Record<string, string>>({});

  // Générer des URLs pour afficher les images sélectionnées
  fileUpload.acceptedFiles.forEach((file) => {
    if (!previews[file.name]) {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [file.name]: url }));
    }
  });

  // Supprimer un fichier
  const handleRemoveFile = (file: File) => {
    fileUpload.deleteFile(file);
    setPreviews((prev) => {
      const updatedPreviews = { ...prev };
      delete updatedPreviews[file.name];
      return updatedPreviews;
    });
  };
  console.log("taille", fileUpload.acceptedFiles.length);

  return (
    <Box
      p="24px"
      borderRadius="7px"
      border="1px solid"
      width="full"
      borderColor="whiteAlpha.400"
    >
      <Heading>Media</Heading>
      <FileUploadRootProvider value={fileUpload}>
        <FileUploadRoot
          maxW="xl"
          alignItems="stretch"
          maxFiles={10}
          maxFileSize={5 * 1024 * 1024}
        >
          <FileUploadDropzone
            label="Glissez-déposez vos images ici"
            description=".png, .jpg jusqu'à 5MB"
          />
          <FileUploadList clearable />
        </FileUploadRoot>

        {/* Affichage des fichiers acceptés */}
        {fileUpload.acceptedFiles.length > 0 && (
          <Box mt={4}>
            <Heading size="md">Fichiers acceptés :</Heading>
            <Box display="flex" gap={4} flexWrap="wrap">
              {fileUpload.acceptedFiles.map((file) => (
                <Box key={file.name} position="relative" width="100px">
                  {/* Aperçu de l'image */}
                  <Image
                    src={previews[file.name]}
                    alt={file.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />

                  {/* Bouton de suppression */}
                  <IconButton
                    aria-label="Supprimer"
                    size="xs"
                    position="absolute"
                    top="4px"
                    right="4px"
                    onClick={() => handleRemoveFile(file)}
                    bg="white"
                    _hover={{ bg: "red.500", color: "white" }}
                  >
                    <LuX />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Affichage des fichiers rejetés */}
        {fileUpload.rejectedFiles.length > 0 && (
          <Box mt={4}>
            <Heading size="md">Fichiers rejetés :</Heading>
            <ul>
              {fileUpload.rejectedFiles.map((e, index) => (
                <li key={index}>{e.file.name}</li>
              ))}
            </ul>
          </Box>
        )}

        {/* Bouton pour tout supprimer */}
        {fileUpload.acceptedFiles.length > 0 && (
          <Button mt={4} colorScheme="red" onClick={fileUpload.clearFiles}>
            Supprimer tous les fichiers
          </Button>
        )}
      </FileUploadRootProvider>
    </Box>
  );
};

export default MyFileUpload;
