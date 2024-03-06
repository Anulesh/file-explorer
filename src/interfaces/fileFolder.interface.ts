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
export type ValidateNode = (
  parent: FileOrFolderNull,
  node: FileOrFolder | null,
  name: string
) => boolean;
export type ExploreValueContext = {
  filesList: FileOrFolderNull;
  validateNode: ValidateNode;
};
export type Payload = {
  parent: FileOrFolderNull;
  node: FileOrFolder;
  name?: string;
};
export type ActionType = {
  type: 'add' | 'update' | 'delete';
  payload: Payload;
};
export interface FilePropsType {
  node: FileOrFolder;
  parent: FileOrFolder;
}
export interface InputProps {
  defaultValue?: string;
  onComplete: (value: string) => void;
  validateNode: (name: string) => boolean;
}
export type fuzzySearchResult = {
  highlighted: string;
  data: FolderInfoType;
};
