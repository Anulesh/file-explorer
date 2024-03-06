import { MouseEvent, useRef, useState } from 'react';

import EditName from './Input';
import File from './File';
import Folder from './Folder';
import styles from '../styles.module.css';
import {
  FileOrFolder,
  FileOrFolderNull,
} from '../interfaces/fileFolder.interface';
import {
  useExplorer,
  useExplorerDispatch,
} from '../context/FileExplorerProvider';
import { icons } from '../constansts';

interface Props {
  node: FileOrFolder;
  parent: FileOrFolderNull;
}

function FileFolderExplorer({ node, parent }: Props) {
  const explorer = useExplorer();
  const explorerDispatch = useExplorerDispatch();
  const [open, setOpen] = useState(false);
  const [isNewFileFolder, setIsNewFileFolder] = useState(false);
  const folderRef = useRef(false);

  const toggleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const onNew = (isFolder: boolean) => {
    folderRef.current = isFolder;
    setIsNewFileFolder(!isNewFileFolder);
    setOpen(true);
  };

  const validateNodeOnNew = (name: string) => {
    if (explorer.validateNode && typeof explorer.validateNode === 'function') {
      return explorer.validateNode(node, null, name);
    }
    return false;
  };

  const onAdd = (name: string) => {
    if (name && validateNodeOnNew(name)) {
      explorerDispatch({
        type: 'add',
        payload: {
          parent: node,
          node: {
            name,
            id: new Date().getTime().toString(),
            type: folderRef.current ? 'folder' : 'file',
          },
        },
      });
    }
    setIsNewFileFolder(false);
  };

  return (
    <div className={styles.folderDirectory}>
      <Folder
        open={open}
        toggleOpen={toggleOpen}
        parent={parent}
        node={node}
        onNew={onNew}
      />

      {open && (
        <div className={styles.indent}>
          {node.data?.map((childNode) =>
            childNode.type === 'folder' ? (
              <FileFolderExplorer
                key={childNode.id}
                node={childNode}
                parent={node}
              />
            ) : (
              <File key={childNode.id} node={childNode} parent={node} />
            )
          )}

          {isNewFileFolder && (
            <li className={`${styles.list} ${styles.editList}`}>
              {folderRef.current ? icons.folder : icons.file}&nbsp;
              <EditName onComplete={onAdd} validateNode={validateNodeOnNew} />
            </li>
          )}
        </div>
      )}
    </div>
  );
}

export default FileFolderExplorer;
