import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, Settings, Bell } from 'lucide-react';
import useStore from '../../store/useStore';

const Sidebar = () => {
  const getUpcomingFollowUps = useStore((state) => state.getUpcomingFollowUps);
  const followUps = getUpcomingFollowUps();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/websites', icon: Globe, label: 'Websites' },
    { to: '/follow-ups', icon: Bell, label: 'Follow-ups', badge: followUps.length || null },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-800'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
