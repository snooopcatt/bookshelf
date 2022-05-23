import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import BookShelf from './components/BookShelf';
import BookView from './components/BookView';
import { setData } from './data/dataSlice';
import './App.css';

function App() {
  console.log('app');
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('./inventory.json')
      .then(response => response.json())
      .then(json => dispatch(setData(json)));
  })

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
