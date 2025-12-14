import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Navbar from './components/Navbar';
import MiniPlayer from './components/MiniPlayer';
import Home from './pages/Home';
import NowPlaying from './pages/NowPlaying';
import Artist from './pages/Artist';
import Lyrics from './pages/Lyrics';
import Search from './pages/Search';
import Library from './pages/Library';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/lyrics" element={<Lyrics />} />
          </Routes>
          <MiniPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
