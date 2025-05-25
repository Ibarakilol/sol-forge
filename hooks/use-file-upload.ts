import { type ChangeEvent, type DragEvent, useCallback, useRef, useState } from 'react';

import { FileError, MAX_FILE_SIZE_MB, Regex } from '@/constants';
import type { IFile } from '@/interfaces';

export const useFileUpload = (initialFile: IFile | null = null) => {
  const [file, setFile] = useState<IFile | null>(initialFile);
  const [fileError, setFileError] = useState<string>('');
  const [isDragging, setDragging] = useState<boolean>(false);
  const filesInputRef = useRef<HTMLInputElement | null>(null);

  const onClear = useCallback(() => {
    setFile(null);
  }, []);

  const getFileData = useCallback(
    (fileList: FileList | null) => {
      setFileError('');

      if (!fileList) {
        return;
      }

      const uploadedFile = fileList[0];

      if (!uploadedFile) {
        return;
      }

      if (!uploadedFile.name.match(Regex.FILE_NAME)) {
        setFileError(FileError.FILE_NAME);
        onClear();

        return;
      }

      if (!uploadedFile.type.match(Regex.FILE_MIME_IMAGE)) {
        setFileError(FileError.FILE_TYPE);
        onClear();

        return;
      }

      if (uploadedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(FileError.FILE_SIZE);
        onClear();

        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = (evt: any) => {
        setFile({
          data: uploadedFile,
          fileUrl: evt.target.result,
          name: uploadedFile.name,
        });
      };
    },
    [onClear]
  );

  const onUpload = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      getFileData(target.files);
      if (filesInputRef?.current) {
        filesInputRef.current.value = '';
      }
    },
    [getFileData]
  );

  const onDragOver = useCallback((evt: DragEvent<HTMLLabelElement>) => {
    evt.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((evt: DragEvent<HTMLLabelElement>) => {
    evt.preventDefault();
    setDragging(false);
  }, []);

  const onDrop = useCallback(
    (evt: DragEvent<HTMLLabelElement>) => {
      evt.preventDefault();
      getFileData(evt.dataTransfer.files);
      setDragging(false);
    },
    [getFileData]
  );

  return {
    file,
    fileError,
    filesInputRef,
    isDragging,
    onClear,
    onDragLeave,
    onDragOver,
    onDrop,
    onUpload,
  };
};
