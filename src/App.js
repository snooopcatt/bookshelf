import logo from './logo.svg';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div class="content">
        <table style={{ flex: 1 }}></table>
        <div class="preview" style={{ flex: 1 }}></div>
      </div>
    </div>
  );
}

export default App;
