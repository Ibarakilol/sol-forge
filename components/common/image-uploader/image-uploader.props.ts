import type { IFile } from '@/interfaces';

export interface ImageUploaderProps {
  isDisabled?: boolean;
  onImageUpload: (image: IFile[]) => void;
}
