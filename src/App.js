import Header from './components/Header';
import './App.css';
import BookShelf from './components/BookShelf';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <BookShelf />
        <div className="preview" style={{ flex: 1 }}></div>
      </div>
    </div>
  );
}

export default App;
