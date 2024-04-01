import './App.css';
import ImageOverlay from './ImageOverlay.tsx';
import ModernPage from './Modern.tsx';

function App() {
  return (
    <div className="App">

      <ImageOverlay imageUrl='https://cdn.pixabay.com/photo/2023/12/14/00/20/alaska-8448009_1280.jpg' text='IF YOU CAN DESCRIBE. THEN YOU ARE AN ARTIST'/>

      <ModernPage />

    </div>
  );
}
export default App;
