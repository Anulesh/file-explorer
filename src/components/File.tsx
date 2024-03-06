import Input from './Input';
import styles from '../styles.module.css';
import { useState } from 'react';
import { FilePropsType } from '../interfaces/fileFolder.interface';
import {
  useExplorer,
  useExplorerDispatch,
} from '../context/FileExplorerProvider';
import { icons } from '../constansts';

function File({ node, parent }: FilePropsType) {
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
    if (validateNodeOnUpdate(value))
      explorerDispatch({
        type: 'update',
        payload: { parent, node, name: value },
      });
    setIsEditable(false);
  };

  if (isEditable) {
    return (
      <li className={`${styles.list} ${styles.editList}`}>
        📄&nbsp;
        <Input
          defaultValue={node.name}
          onComplete={onUpdate}
          validateNode={validateNodeOnUpdate}
        />
      </li>
    );
  }

  return (
    <li className={styles.list}>
      <button className={styles.button}>
        {icons.file} {node.name}
      </button>

      <div className={styles.controls}>
        <button onClick={() => setIsEditable(true)}>{icons.edit}</button>
        <button
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

export default File;
