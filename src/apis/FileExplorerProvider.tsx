import { createContext, useContext, useReducer } from 'react';
import {
  FileOrFolder,
  FileOrFolderNull,
} from '../interfaces/fileFolder.interface';
import { fileFolderData } from '../data/data';
import { produce } from 'immer';
type ExploreValueContext = {
  filesList: FileOrFolderNull;
  validateNode: (
    parent: FileOrFolderNull,
    node: FileOrFolder | null,
    name: string
  ) => boolean;
};
const ExplorerContext = createContext<Partial<ExploreValueContext>>({});
type Payload = {
  parent: FileOrFolderNull;
  node: FileOrFolder;
  name?: string;
};
type ActionType = {
  type: 'add' | 'update' | 'delete';
  payload: Payload;
};
const ExplorerDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {}
);
/**
 * Validate the name of node
 * @param parent
 * @param node The current node. If `null`, then it means it is going to be a "new" node
 * @param name
 */
const validateNode = (
  parent: FileOrFolderNull,
  node: FileOrFolder | null,
  name: string
): boolean => {
  if (parent === null) return true;
  if (typeof parent.data === 'undefined') return true;
  if (name === '') return false;

  // Find a node with same name
  const idx = parent.data?.findIndex(
    (n) => n.id !== node?.id && n.name === name
  );
  return idx === -1;
};
export const FileExplorerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filesList, dispatch] = useReducer(explorerReducer, fileFolderData);

  return (
    <ExplorerContext.Provider value={{ filesList, validateNode }}>
      <ExplorerDispatchContext.Provider value={dispatch}>
        {children}
      </ExplorerDispatchContext.Provider>
    </ExplorerContext.Provider>
  );
};

export function useExplorer() {
  return useContext(ExplorerContext);
}

export function useExplorerDispatch() {
  return useContext(ExplorerDispatchContext);
}
const updateFileList = (
  folderData: FileOrFolder,
  name: string | undefined,
  payload: FileOrFolder[] | undefined
) => {
  if (folderData.name === name) {
    folderData.data = payload;
  } else {
    if (folderData.type === 'folder') {
      folderData.data?.forEach((f) => {
        updateFileList(f, name, payload);
      });
    }
  }
  return folderData;
};
const explorerReducer = produce(
  (filesList: FileOrFolder, action: ActionType) => {
    switch (action.type) {
      case 'add': {
        const { parent, node } = action.payload;
        const nodes = [...(parent?.data ?? [])];

        nodes.push({
          ...node,
          data: [],
        });
        if (parent?.id === 'root') {
          filesList.data = nodes;
        } else {
          filesList = updateFileList(filesList, parent?.name, nodes);
        }
        break;
      }
      case 'delete': {
        const { parent, node } = action.payload;
        const nodes = parent?.data?.filter(
          (i: FileOrFolder) => i.id !== node.id
        );

        if (parent?.id === 'root') {
          filesList.data = nodes;
        } else {
          filesList = updateFileList(filesList, parent?.name, nodes);
        }
        break;
      }
      case 'update': {
        const { parent, node, name } = action.payload;
        const nodes = parent?.data?.map((n: FileOrFolder) => n) ?? [];
        const idx = nodes.findIndex((n: FileOrFolder) => n.id === node.id);
        if (name) nodes[idx] = { ...nodes[idx], name };

        if (parent?.id === 'root') {
          filesList.data = nodes;
        } else {
          filesList = updateFileList(filesList, parent?.name, nodes);
        }
        break;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
);
