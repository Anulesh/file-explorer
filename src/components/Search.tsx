import {
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import styles from '../styles.module.css';
import {
  FileOrFolderNull,
  FolderInfoType,
} from '../interfaces/fileFolder.interface';
import { useExplorer } from '../apis/FileExplorerProvider';
type fuzzySearchResult = {
  highlighted: string;
  data: FolderInfoType;
};
const fuzzySearchWithHighlight = (
  array: FolderInfoType[],
  searchTerm: string
) => {
  const results: fuzzySearchResult[] = [];

  array.forEach((item) => {
    let [text, extension] = item.name.split('.');
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Bitap algorithm implementation
    const m = searchTermLowerCase.length;
    const MAX_DISTANCE = 5; // Increasing maximum allowed distance for fuzzy matching

    if (m === 0) {
      results.push({ data: item, highlighted: text });
      return;
    }

    if (text.length === 0) {
      return;
    }

    let currentRow = new Array(text.length + 1).fill(0);
    for (let i = 0; i <= text.length; i++) {
      currentRow[i] = i;
    }

    for (let i = 0; i < m; i++) {
      let previousDiagonal = currentRow[0];
      currentRow[0] = i + 1;

      for (let j = 0; j < text.length; j++) {
        let addCost = currentRow[j] + 1;
        let deleteCost = previousDiagonal + 1;
        let replaceCost =
          searchTermLowerCase[i] !== text[j].toLowerCase()
            ? previousDiagonal + 1
            : previousDiagonal;
        previousDiagonal = currentRow[j + 1];
        currentRow[j + 1] = Math.min(addCost, deleteCost, replaceCost);
      }
    }

    if (currentRow[text.length] <= MAX_DISTANCE) {
      // Highlight matching tokens
      let highlightedText = '';
      let startIndex = 0;
      let matched = false;
      let matchedSubstr = '';
      let remStrPos: number[] = [];
      for (let i = 0; i < text.length; i++) {
        if (text[i].toLowerCase() === searchTermLowerCase[startIndex]) {
          matchedSubstr += text[i];

          if (!matched) {
            highlightedText += '<b>';
          }
          highlightedText += text[i];
          startIndex++;

          if (startIndex === m) {
            highlightedText += '</b>';
            matched = true;
            remStrPos = [i, startIndex];
            break;
          }
        } else {
          if (matchedSubstr.length > 0) {
            highlightedText += '</b>';
            matchedSubstr = '';
          }
          highlightedText += text[i];
        }
      }

      if (matched) {
        highlightedText += text.slice(remStrPos[0] + 1);
        highlightedText += '</b>';
        highlightedText = highlightedText.replace(/<\/b><\/b>/g, '</b>');

        results.push({
          data: item,
          highlighted: extension
            ? `<p>${highlightedText}.${extension}</p><span>${item.path}</span>`
            : `<p>${highlightedText}</p><span>${item.path}</span>`,
        });
      }
    }
  });

  return results;
};
const flattenfileFolderData = (
  fileFOlderList: FileOrFolderNull | undefined,
  res: FolderInfoType[],
  path = ''
) => {
  if (fileFOlderList) {
    const { id, name, type, meta, data } = fileFOlderList;
    res.push({ id, name, meta, type, path });
    if (type === 'folder') {
      data?.forEach((f) => {
        flattenfileFolderData(f, res, `${path}/${name.toLowerCase()}`);
      });
    }
    return res;
  }
  return [];
};
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
