import { Home, Music, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: Music, label: 'Library', path: '/library' },
        { icon: User, label: 'Artist', path: '/artist/art1' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 glass border-t md:border-t-0 md:border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between md:justify-start gap-8 py-4">
                    {/* Logo - Desktop only */}
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-bold text-gradient">ArchiveTune</h1>
                    </div>

                    {/* Nav Items */}
                    <div className="flex items-center justify-around md:justify-start gap-1 md:gap-6 w-full md:w-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${isActive(item.path)
                                        ? 'bg-purple-500/20 text-purple-400'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="text-xs md:text-sm font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
