import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Stethoscope, 
  LogOut,
  UserCircle 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPath = location.pathname;
  
  const getLinkClass = (path: string) => {
    const isActive = currentPath === path || currentPath.startsWith(path) && path !== '/admin/dashboard' && path !== '/patient/dashboard';
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mt-2 ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50 transform translate-x-1' 
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
    }`;
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white/80 backdrop-blur-xl border-r border-indigo-100/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 text-indigo-600 pl-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
            <Stethoscope size={24} />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
            ENTNT Dental
          </h2>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 pl-4">
            {user?.role === 'Admin' ? 'Admin Menu' : 'Patient Menu'}
          </p>

          {user?.role === 'Admin' ? (
            <nav className="flex flex-col">
              <Link to="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/admin/calendar" className={getLinkClass('/admin/calendar')}>
                <CalendarDays size={20} />
                <span className="font-medium">Calendar</span>
              </Link>
              <Link to="/admin/appointments" className={getLinkClass('/admin/appointments')}>
                <Stethoscope size={20} />
                <span className="font-medium">Appointments</span>
              </Link>
              <Link to="/admin/patients" className={getLinkClass('/admin/patients')}>
                <Users size={20} />
                <span className="font-medium">Patients</span>
              </Link>
            </nav>
          ) : (
            <nav className="flex flex-col">
               <Link to="/patient/dashboard" className={getLinkClass('/patient/dashboard')}>
                <LayoutDashboard size={20} />
                <span className="font-medium">My Dashboard</span>
              </Link>
               <Link to="/patient/history" className={getLinkClass('/patient/history')}>
                <CalendarDays size={20} />
                <span className="font-medium">My History</span>
              </Link>
            </nav>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-indigo-50/50 bg-gray-50/30">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
             <UserCircle size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
            <p className="text-xs text-indigo-500">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors duration-200 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 