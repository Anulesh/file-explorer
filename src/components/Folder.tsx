import { MouseEvent, useState } from 'react';

import Input from './Input';
import styles from '../styles.module.css';
import {
  FileOrFolder,
  FileOrFolderNull,
} from '../interfaces/fileFolder.interface';
import { useExplorer, useExplorerDispatch } from '../apis/FileExplorerProvider';

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
        {open ? '📂' : '📁'}&nbsp;
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
        {open ? '📂' : '📁'} {node?.name}
      </button>

      <div className={styles.controls}>
        <button className="edit" onClick={() => setIsEditable(true)}>
          ✏️
        </button>
        <button className="new-file" onClick={() => onNew(false)}>
          📄
        </button>
        <button className="new-folder" onClick={() => onNew(true)}>
          🗂
        </button>
        <button
          className="delete"
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onClick={() =>
            explorerDispatch({ type: 'delete', payload: { parent, node } })
          }
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default Folder;
