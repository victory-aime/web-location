import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Text,
  Icon,
  VStack,
  Image,
  HStack,
  CloseButton,
  Alert,
  Float,
} from "@chakra-ui/react";
import { useDropzone, Accept } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { BaseButton } from "../button";

interface ExtendedFile extends File {
  preview: string;
}

interface DragDropZoneProps {
  onDrop?: (acceptedFiles: File[]) => void;
}

export default function DragDropZone({ onDrop }: DragDropZoneProps) {
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"size" | "max_file" | null>(null);
  const MAX_FILES = 5;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any) => {
      setError(null); // Réinitialiser les erreurs

      if (rejectedFiles.length > 0) {
        setError("Certains fichiers dépassent la taille maximale de 5MB.");
        setErrorType("size");
        return;
      }

      // Vérifier si le nombre total d'images dépasse la limite
      if (files.length + acceptedFiles.length > MAX_FILES) {
        setError(`Vous ne pouvez ajouter que ${MAX_FILES} images maximum.`);
        setErrorType("max_file");
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Ajouter les images
      if (onDrop) onDrop(newFiles);
    },
    [onDrop, files.length]
  );

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Efface automatiquement l'erreur après 3 secondes
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
        setErrorType(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*" as unknown as Accept,
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
    multiple: true,
  });

  return (
    <Box mt={6}>
      {/* Zone de Drop */}
      <Text>Photo</Text>
      <Box
        border="2px dashed"
        borderColor={
          error ? "red.500" : isDragActive ? "primary.900" : "gray.300"
        }
        p={6}
        mt={2}
        cursor="pointer"
        transition="border 0.3s ease-in-out"
        _hover={{ borderColor: "primary.400" }}
        borderRadius="md"
      >
        {/* Affichage des images sélectionnées */}
        {files.length > 0 && (
          <HStack
            mt={4}
            mb={4}
            gap={4}
            alignItems={"center"}
            justifyContent={"center"}
            wrap="wrap"
          >
            {files.map((file) => (
              <Box key={file.name} position="relative">
                <Float>
                  <CloseButton
                    bg="red.500"
                    color="white"
                    size="xs"
                    onClick={() => removeFile(file.name)}
                  />
                </Float>
                <Image
                  src={file.preview}
                  alt={file.name}
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="md"
                  shadow="md"
                />
              </Box>
            ))}
          </HStack>
        )}

        <VStack
          justifyContent={"center"}
          gap={4}
          {...getRootProps()}
          width={"full"}
          minH={"150px"}
        >
          <input {...getInputProps()} />
          {files.length === 0 && (
            <Icon as={FiUpload} boxSize={8} color="gray.500" />
          )}
          <Text fontSize="sm" color="gray.600">
            {isDragActive
              ? "Déposez les fichiers ici..."
              : "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
          </Text>
          <Box {...getRootProps()}>
            <BaseButton bgColor={"blue.500"}>Add image</BaseButton>
          </Box>
        </VStack>
      </Box>

      {/* Affichage de l'erreur si trop d'images ou fichiers trop lourds */}
      {error && (
        <Alert.Root status="error" mt={5} p={4} width={"fit-content"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {errorType === "max_file" ? "Nombre Atteints" : "Taille limite"}
            </Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Box>
  );
}
