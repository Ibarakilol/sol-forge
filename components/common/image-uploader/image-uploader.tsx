import { useEffect, useId } from 'react';
import clsx from 'clsx';

import TextError from '@/components/ui/text-error';
import ImageUploadIcon from '@/assets/icons/image-upload.svg';

import { MAX_FILE_SIZE_MB } from '@/constants';
import { useFileUpload } from '@/hooks';
import type { ImageUploaderProps } from './image-uploader.props';

import styles from './image-uploader.module.scss';

const ImageUploader = ({ isDisabled, isValid = true, onImageUpload }: ImageUploaderProps) => {
  const id = useId();

  const { file, fileError, filesInputRef, isDragging, onDrop, onDragOver, onDragLeave, onUpload } =
    useFileUpload(null);

  useEffect(() => {
    if (file) {
      onImageUpload(file);
    }
  }, [file, onImageUpload]);

  return (
    <div className={styles.imageUploader}>
      <label
        className={clsx(
          styles.imageUploaderBrowse,
          isDisabled && styles.imageUploaderBrowseDisabled,
          isDragging && styles.imageUploaderBrowseDragging,
          !isValid && styles.imageUploaderBrowseInvalid
        )}
        htmlFor={id}
        tabIndex={isDisabled ? -1 : 0}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={isDisabled ? undefined : onDrop}
      >
        <div className={styles.imageUploaderBrowseText}>
          <div className={styles.imageUploaderBrowseHeading}>
            <ImageUploadIcon className={styles.imageUploaderBrowseIcon} />
            <span className={styles.imageUploaderBrowseTitle}>
              Drop your logo here or click to browse
            </span>
          </div>
          <span className={styles.imageUploaderBrowseDescription}>
            PNG, JPG, WebP up to {MAX_FILE_SIZE_MB}MB
          </span>
        </div>
        <input
          ref={filesInputRef}
          accept="image/jpeg,image/png,image/jpg,image/jpe,image/webp"
          className={styles.imageUploaderBrowseInput}
          disabled={isDisabled}
          id={id}
          type="file"
          onChange={onUpload}
          onClick={(evt) => evt.stopPropagation()}
        />
        {fileError && <TextError textError={fileError} />}
      </label>
    </div>
  );
};

export default ImageUploader;
