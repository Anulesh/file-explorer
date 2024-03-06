import { fileFolderData } from '../data/data';
import { Response } from '../interfaces/fileFolder.interface';
const REQUEST_DELAY = 200;

export const fetchData = (): Promise<Response> => {
  return delay<Response>((resolve, reject) => {
    resolve({
      status: 200,
      statusText: 'Ok',
      data: fileFolderData,
    });
  });
};

function delay<T>(
  task: (resolve: (value: T) => void, reject: (value: T) => void) => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      task(resolve, reject);
    }, REQUEST_DELAY);
  });
}
