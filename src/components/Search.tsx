import {
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import styles from '../styles.module.css';
import { fuzzySearchResult } from '../interfaces/fileFolder.interface';
import { useExplorer } from '../context/FileExplorerProvider';
import { flattenfileFolderData, fuzzySearchWithHighlight } from '../helpers';

const Search = () => {
  const explorer = useExplorer();
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState<fuzzySearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const refComboList = useRef<HTMLInputElement>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = (e.target as HTMLInputElement).value;
    setValue(newVal);
  };

  useEffect(() => {
    const flattenList = flattenfileFolderData(explorer.filesList, [], '');
    if (value !== '') {
      const searchResults = fuzzySearchWithHighlight(flattenList, value);
      setSearchResults(searchResults);
    } else {
      setSearchResults([]);
    }
  }, [value, explorer.filesList]);
  useEffect(() => {
    if (refComboList.current) {
      if (searchResults.length) {
        refComboList.current.style.borderBottomLeftRadius = '0';
        refComboList.current.style.borderBottomRightRadius = '0';
      } else {
        refComboList.current.style.borderBottomLeftRadius = '4px';
        refComboList.current.style.borderBottomRightRadius = '4px';
      }
    }
  }, [searchResults]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setSelectedItem((prev) =>
        prev <= 0 ? searchResults.length - 1 : prev - 1
      );
    } else if (e.key === 'ArrowDown') {
      setSelectedItem((prev) =>
        prev >= searchResults.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === 'Enter' && selectedItem >= 0) {
    }
  };

  return (
    <div className={styles.searchDiv}>
      <input
        type="text"
        autoFocus={true}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="false"
        aria-controls="cb1-listbox"
        ref={refComboList}
      />
      {searchResults.length ? (
        <ul role="listbox" id="cb1-listbox">
          {searchResults.map((s, id) => (
            <li
              role="option"
              aria-selected={selectedItem === id}
              key={id}
              data-id={id}
              dangerouslySetInnerHTML={{ __html: s.highlighted }}
            ></li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
