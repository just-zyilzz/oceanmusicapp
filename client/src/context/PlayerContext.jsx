import { createContext, useContext, useState } from 'react';
import mockData from '../data/mockData.json';
import { getSongDetails } from '../utils/api';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState(mockData.songs);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);

    const playSong = async (song) => {
        setCurrentSong(song);
        const index = queue.findIndex(s => s.id === song.id);
        if (index !== -1) setCurrentIndex(index);

        // Fetch real streaming URL from API
        if (song.videoId) {
            setIsLoadingAudio(true);
            try {
                const songDetails = await getSongDetails(song.videoId);
                if (songDetails && songDetails.streamUrl) {
                    setAudioUrl(songDetails.streamUrl);
                    setIsPlaying(true);
                } else {
                    console.error('Failed to get stream URL');
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Error fetching song stream:', error);
                setIsPlaying(true);
            } finally {
                setIsLoadingAudio(false);
            }
        } else {
            setIsPlaying(true);
        }
    };

    const pauseSong = () => {
        setIsPlaying(false);
    };

    const nextSong = async () => {
        const nextIndex = (currentIndex + 1) % queue.length;
        setCurrentIndex(nextIndex);
        await playSong(queue[nextIndex]);
    };

    const prevSong = async () => {
        const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        await playSong(queue[prevIndex]);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            queue,
            audioUrl,
            isLoadingAudio,
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
