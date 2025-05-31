import type { IFile } from '@/interfaces';

export interface ImageUploaderProps {
  isDisabled?: boolean;
  isValid?: boolean;
  onImageUpload: (image: IFile) => void;
}
