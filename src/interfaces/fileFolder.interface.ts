export interface FileOrFolder {
  id: string;
  name: string;
  type: FolderTypes | string;
  meta?: string;
  data?: FileOrFolder[];
}
export type FolderDataType = Omit<FileOrFolder, 'id'>;
type FolderTypes = 'file' | 'folder';
export type FileOrFolderNull = FileOrFolder | null;
export interface Response {
  status: number;
  statusText: string;
  data?: FileOrFolder | null;
}
export interface FolderInfoType extends Omit<FileOrFolder, 'data'> {
  path: string;
}
