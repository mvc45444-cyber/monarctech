import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-indigo-950 border-b border-indigo-900">
      <div className="px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="h-8 w-8 text-amber-400" />
          <span className="text-xl font-bold text-white">
            Monarc Tech
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
