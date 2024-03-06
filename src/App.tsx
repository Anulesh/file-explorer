import styles from './styles.module.css';
import { FileExplorerProvider } from './context/FileExplorerProvider';
import Home from './Home';

function App() {
  return (
    <div className={styles.app}>
      <FileExplorerProvider>
        <Home />
      </FileExplorerProvider>
    </div>
  );
}

export default App;
