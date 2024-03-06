import { MouseEvent, useState } from 'react';

import Input from './Input';
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
  open: boolean;
  toggleOpen: (ex: MouseEvent) => void;
  node: FileOrFolder;
  parent: FileOrFolderNull;
  onNew: (a: boolean) => void;
}

function Folder({ open, toggleOpen, parent, node, onNew }: Props) {
  const explorer = useExplorer();
  const explorerDispatch = useExplorerDispatch();
  const [isEditable, setIsEditable] = useState(false);

  const validateNodeOnUpdate = (name: string) => {
    if (explorer.validateNode && typeof explorer.validateNode === 'function') {
      return explorer.validateNode(parent, node, name);
    }
    return true;
  };

  const onUpdate = (value: string) => {
    if (parent) {
      if (validateNodeOnUpdate(value))
        explorerDispatch({
          type: 'update',
          payload: { parent, node, name: value },
        });
      setIsEditable(false);
    }
  };

  if (isEditable) {
    return (
      <li className={`${styles.list} ${styles.editList}`}>
        {open ? icons.folderOpen : icons.folder}&nbsp;
        <Input
          defaultValue={node?.name}
          onComplete={onUpdate}
          validateNode={validateNodeOnUpdate}
        />
      </li>
    );
  }

  return (
    <li className={styles.list} data-root={parent === null}>
      <button onClick={toggleOpen}>
        {open ? icons.folderOpen : icons.folder} {node?.name}
      </button>

      <div className={styles.controls}>
        <button className="edit" onClick={() => setIsEditable(true)}>
          {icons.edit}
        </button>
        <button className="new-file" onClick={() => onNew(false)}>
          {icons.newFile}
        </button>
        <button className="new-folder" onClick={() => onNew(true)}>
          {icons.newFolder}
        </button>
        <button
          className="delete"
          onClick={() =>
            explorerDispatch({ type: 'delete', payload: { parent, node } })
          }
        >
          {icons.delete}
        </button>
      </div>
    </li>
  );
}

export default Folder;
