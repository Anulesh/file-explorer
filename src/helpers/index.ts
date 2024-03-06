import { FUZZY_MATCHING_MAX_DISTANCE } from '../constansts';
import {
  FileOrFolderNull,
  FolderInfoType,
  fuzzySearchResult,
} from '../interfaces/fileFolder.interface';

export const fuzzySearchWithHighlight = (
  array: FolderInfoType[],
  searchTerm: string
) => {
  const results: fuzzySearchResult[] = [];

  array.forEach((item) => {
    let [text, extension] = item.name.split('.');
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Bitap algorithm implementation
    const m = searchTermLowerCase.length;

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

    if (currentRow[text.length] <= FUZZY_MATCHING_MAX_DISTANCE) {
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
export const flattenfileFolderData = (
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
