'use client';

import { Circle, FileUpload, Float, useFileUploadContext } from '@chakra-ui/react';
import { Avatar } from '_components/ui/avatar';
import { HiUpload } from 'react-icons/hi';
import { LuX } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { MAX_FILE_SIZE, MAX_FILES } from './constant/constants';
import { UTILS } from '@shop/shop-shared';

const FileUploadList = ({
  getFilesUploaded,
  base64Images,
}: {
  getFilesUploaded: (files: File[]) => void;
  base64Images?: string[];
}) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'size' | 'type' | null>(null);

  useEffect(() => {
    if (fileUpload.rejectedFiles.length > 0) {
      const oversizedFiles = fileUpload.rejectedFiles.filter((file) =>
        file.errors.includes('FILE_TOO_LARGE')
      );

      const invalidTypeFiles = fileUpload.rejectedFiles.filter((file) =>
        file.errors.includes('FILE_INVALID_TYPE')
      );

      if (oversizedFiles.length > 0) {
        setErrorType('size');
        setError(`Ce fichier dépasse la taille maximale de ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
      } else if (invalidTypeFiles.length > 0) {
        setErrorType('type');
        setError('Ce fichier a un format non supporté. Formats acceptés : .png, .jpg, .jpeg');
      } else {
        setError(null);
        setErrorType(null);
      }
    }
    getFilesUploaded(fileUpload.acceptedFiles);
  }, []);

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
    if (base64Images && base64Images.length > 0 && fileUpload.acceptedFiles.length === 0) {
      const convertedFiles = base64Images?.map((base64, index) =>
        UTILS.base64ToFile(base64, `image-${index}.jpg`)
      );
      fileUpload.setFiles([...convertedFiles, ...fileUpload.acceptedFiles]);
    }
  }, [base64Images]);

  if (files.length === 0) return null;

  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item w="auto" boxSize="20" p="2" file={file} key={file.name}>
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export const UploadAvatar = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <FileUpload.Root accept="image/*">
      <FileUpload.HiddenInput />
      <Avatar
        boxSize={'100px'}
        size={'2xl'}
        colorPalette={'yellow'}
        name={'test'}
        src={imageUrl || undefined}
        css={{
          outlineWidth: '2px',
          outlineColor: 'colorPalette.500',
          outlineOffset: '2px',
          outlineStyle: 'solid',
        }}
      >
        <Float placement="bottom-end" offsetX="2" offsetY="2">
          <Circle bg="gray.500" size="25px" outline="0.2em solid" outlineColor="bg">
            <FileUpload.Trigger asChild>
              <HiUpload size={'14px'} color={'white'} />
            </FileUpload.Trigger>
          </Circle>
        </Float>
      </Avatar>
    </FileUpload.Root>
  );
};
