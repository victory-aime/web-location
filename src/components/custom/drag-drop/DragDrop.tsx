"use client";

import {
  Alert,
  Box,
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneContent,
  FileUploadItemPreviewImage,
  Float,
  HStack,
  Text,
  Icon,
  useFileUpload,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import {
  ACCEPTED_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
} from "./constant/constants";
import { UTILS } from "_/store/src";

const FileImageList = ({
  getFilesUploaded,
  base64Images,
}: {
  getFilesUploaded: (files: File[]) => void;
  base64Images?: string[];
}) => {
  const fileUpload = useFileUploadContext();
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "size" | "max_file" | "type" | null
  >(null);

  useEffect(() => {
    if (fileUpload.acceptedFiles.length > MAX_FILES) {
      setErrorType("max_file");
      setError(`Vous ne pouvez pas télécharger plus de ${MAX_FILES} fichiers.`);
    } else if (fileUpload.rejectedFiles.length > 0) {
      const oversizedFiles = fileUpload.rejectedFiles.filter((file) =>
        file.errors.includes("FILE_TOO_LARGE")
      );

      const invalidTypeFiles = fileUpload.rejectedFiles.filter((file) =>
        file.errors.includes("FILE_INVALID_TYPE")
      );

      const limitFiles = fileUpload.rejectedFiles.filter((file) =>
        file.errors.includes("TOO_MANY_FILES")
      );

      if (oversizedFiles.length > 0) {
        setErrorType("size");
        setError(
          `Certains fichiers dépassent la taille maximale de ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
        );
      } else if (invalidTypeFiles.length > 0) {
        setErrorType("type");
        setError(
          "Certains fichiers ont un format non supporté. Formats acceptés : .png, .jpg, .jpeg"
        );
      } else if (limitFiles.length > 0) {
        setErrorType("max_file");
        setError(
          `Vous ne pouvez pas télécharger plus de ${MAX_FILES} fichiers.`
        );
      } else {
        setError(null);
        setErrorType(null);
      }
    }
    // 🔥 Mise à jour des fichiers téléversés pour le parent
    getFilesUploaded(fileUpload.acceptedFiles);
  }, [fileUpload]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
        setErrorType(null);
        fileUpload.clearRejectedFiles();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (
      base64Images &&
      base64Images.length > 0 &&
      fileUpload.acceptedFiles.length === 0
    ) {
      const convertedFiles = base64Images?.map((base64, index) =>
        UTILS.base64ToFile(base64, `image-${index}.jpg`)
      );
      fileUpload.setFiles([...convertedFiles, ...fileUpload.acceptedFiles]);
    }
  }, [base64Images]);

  return (
    <Box mt={6} w={"full"}>
      <HStack justifyContent={"center"} wrap="wrap" gap="3">
        {fileUpload.acceptedFiles.map((file) => (
          <FileUpload.Item
            p="2"
            width="auto"
            key={file.name}
            file={file}
            pos="relative"
          >
            <Float>
              <FileUpload.ItemDeleteTrigger
                p="0.5"
                rounded="l1"
                bg="red.500"
                borderWidth="1px"
              >
                <HiX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
            <FileUploadItemPreviewImage boxSize="100px" objectFit="cover" />
          </FileUpload.Item>
        ))}
      </HStack>
      {error && (
        <Alert.Root status="error" mt={5} p={4} width={"fit-content"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>
              {errorType === "max_file"
                ? "Nombre de fichiers atteint"
                : errorType === "size"
                  ? "Taille limite dépassée"
                  : "Format non accepté"}
            </Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
    </Box>
  );
};

export const CustomDragDropZone = ({
  getFilesUploaded,
  base64Images,
}: {
  getFilesUploaded: (files: File[]) => void;
  base64Images?: string[];
}) => {
  const { getRootProps } = useFileUpload();

  return (
    <FileUpload.Root
      {...getRootProps()}
      maxFiles={MAX_FILES}
      maxFileSize={MAX_FILE_SIZE}
      alignItems="stretch"
      accept={ACCEPTED_TYPES}
      _dragging={{ borderColor: "primary.500" }}
    >
      <FileUpload.HiddenInput />
      <FileImageList
        getFilesUploaded={getFilesUploaded}
        base64Images={base64Images}
      />
      <FileUploadDropzone>
        <Icon fontSize="xl" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUploadDropzoneContent>
          <div>
            {"Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
          </div>
          <Text color="fg.muted">.png, .jpg jusqu'à {MAX_FILE_SIZE_MB}MB</Text>
        </FileUploadDropzoneContent>
      </FileUploadDropzone>
    </FileUpload.Root>
  );
};
