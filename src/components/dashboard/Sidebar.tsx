
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  LayoutDashboard,
  CalendarClock,
  MapPin,
  Users,
  ShoppingCart,
  LogOut,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  userType: 'admin' | 'owner';
}

export default function Sidebar({ userType }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Ground Owners', icon: Users, path: '/admin/owners' },
    { name: 'Grounds', icon: MapPin, path: '/admin/grounds' },
    { name: 'Inventory', icon: ShoppingCart, path: '/admin/inventory' },
  ];

  const ownerLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/owner/dashboard' },
    { name: 'Bookings', icon: CalendarClock, path: '/owner/bookings' },
    { name: 'Inventory', icon: ShoppingCart, path: '/owner/inventory' },
  ];

  const links = userType === 'admin' ? adminLinks : ownerLinks;
  const rootPath = userType === 'admin' ? '/admin' : '/owner';

  return (
    <div
      className={cn(
        'relative h-screen bg-white border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex justify-between items-center px-4 h-16 border-b">
        {!collapsed && (
          <div className="flex items-center">
            {userType === 'admin' ? (
              <span className="font-bold text-lg text-playspot-primary">Admin Portal</span>
            ) : (
              <span className="font-bold text-lg text-playspot-primary">Owner Portal</span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="px-3 py-4">
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center px-2 py-2 rounded-md transition-colors',
                pathname === link.path
                  ? 'bg-playspot-light text-playspot-primary'
                  : 'text-gray-600 hover:bg-gray-100',
                collapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <link.icon className={cn('h-5 w-5', collapsed ? 'mr-0' : 'mr-3')} />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div
          className={cn(
            'flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors',
            collapsed ? 'justify-center' : 'justify-start'
          )}
        >
          <LogOut className={cn('h-5 w-5', collapsed ? 'mr-0' : 'mr-3')} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
}
