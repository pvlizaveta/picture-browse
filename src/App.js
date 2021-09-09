import PictureBrowse from "./components/PictureBrowse";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main>
        <PictureBrowse defaultKeyWord="Pictures" />
      </main>
      <footer>
        <a href="https://github.com/pvlizaveta/picture-browse">
          Open-source code
        </a>{" "}
        by Lizaveta Pauliushchyk
      </footer>
    </div>
  );
}

export default App;
