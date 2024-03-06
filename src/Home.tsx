import { useExplorer } from './context/FileExplorerProvider';
import FileFolderExplorer from './components/FileFolderExplorer';
import Search from './components/Search';

const Home = () => {
  const explorer = useExplorer();
  return (
    <>
      {explorer.filesList && (
        <>
          <Search />
          <FileFolderExplorer node={explorer.filesList} parent={null} />
        </>
      )}
    </>
  );
};
export default Home;
