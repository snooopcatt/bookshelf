import Header from './components/Header';
import BookShelf from './components/BookShelf';
import BookView from './components/BookView';
import './App.css';

function App() {
  console.log('app');

  return (
    <div className="App">
      <Header />
      <div className="content">
        <BookShelf />
        <BookView />
      </div>
    </div>
  );
}

export default App;
