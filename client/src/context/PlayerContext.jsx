import { createContext, useContext, useState } from 'react';
import mockData from '../data/mockData.json';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState(mockData.songs);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);

    // Mock audio URL for testing (free audio sample from freesound.org)
    // In production, this would be fetched from backend API
    const MOCK_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
        const index = queue.findIndex(s => s.id === song.id);
        if (index !== -1) setCurrentIndex(index);

        // Set mock audio URL for development/testing
        // In production, fetch actual stream URL from API: getSongDetails(song.videoId)
        setAudioUrl(MOCK_AUDIO_URL);
    };

    const pauseSong = () => {
        setIsPlaying(false);
    };

    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % queue.length;
        setCurrentIndex(nextIndex);
        setCurrentSong(queue[nextIndex]);
        setIsPlaying(true);
        setAudioUrl(MOCK_AUDIO_URL);
    };

    const prevSong = () => {
        const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setCurrentSong(queue[prevIndex]);
        setIsPlaying(true);
        setAudioUrl(MOCK_AUDIO_URL);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            queue,
            audioUrl,
            setAudioUrl,
            playSong,
            pauseSong,
            nextSong,
            prevSong,
        }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within PlayerProvider');
    }
    return context;
}
