export interface fileOrFolder {
  id: string;
  name: string;
  type: folderTypes;
  data?: fileOrFolder[];
}
export type folderDataType = Omit<fileOrFolder, 'id'>;
type folderTypes = 'file' | 'folder';
export type fileOrFolderNull = fileOrFolder | null;
