import { useState, useCallback } from "react";
import {
  Box,
  Text,
  Icon,
  VStack,
  Image,
  HStack,
  CloseButton,
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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new images
      if (onDrop) onDrop(newFiles);
    },
    [onDrop]
  );

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*" as unknown as Accept,
    multiple: true,
  });

  return (
    <Box textAlign="center">
      {/* Drop Zone */}
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor={isDragActive ? "blue.400" : "gray.300"}
        p={6}
        cursor="pointer"
        transition="border 0.3s ease-in-out"
        _hover={{ borderColor: "blue.400" }}
        borderRadius="md"
      >
        <VStack gap={4}>
          <input {...getInputProps()} />
          {/* Display selected images */}
          {files.length > 0 ? (
            <HStack mt={4} gap={4} wrap="wrap">
              {files.map((file) => (
                <Box key={file.name} position="relative">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                    shadow="md"
                  />
                  <CloseButton
                    position="absolute"
                    top={0}
                    right={0}
                    bg="red.500"
                    color="white"
                    size="sm"
                    onClick={() => removeFile(file.name)}
                  />
                </Box>
              ))}
            </HStack>
          ) : (
            <Icon as={FiUpload} boxSize={8} color="gray.500" />
          )}
          <Text fontSize="sm" color="gray.600">
            {isDragActive
              ? "Déposez les fichiers ici..."
              : "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
          </Text>
          <BaseButton>Add image</BaseButton>
        </VStack>
      </Box>
    </Box>
  );
}
