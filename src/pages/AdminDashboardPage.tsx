import MainLayout from '../components/layout/MainLayout';
import { useData, type Incident } from '../contexts/DataContext';
import { 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  DollarSign
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { 
    getUpcomingAppointments, 
    getRevenue, 
    getTreatmentStatusCounts,
    getPatientName 
  } = useData();

  const nextAppointments = getUpcomingAppointments(10);
  const revenue = getRevenue();
  const statusCounts = getTreatmentStatusCounts();

  return (
    <MainLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Platform Overview</h1>
          <p className="text-gray-500 text-lg">Monitor operations, revenue, and upcoming schedules.</p>
        </div>
      </div>
      
      {/* Premium KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Revenue Card */}
        <div className="relative group bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden hover:shadow-indigo-100/60 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full transition-transform group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                <DollarSign size={24} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</h2>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-gray-900">${revenue.total.toFixed(2)}</p>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="relative group bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden hover:shadow-indigo-100/60 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full transition-transform group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pending Tx</h2>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-gray-900">{statusCounts.pending}</p>
                  <Activity size={16} className="text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="relative group bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden hover:shadow-indigo-100/60 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-50 rounded-full transition-transform group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Completed</h2>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-extrabold text-gray-900">{statusCounts.completed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Upcoming Appointments List */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Next Appointments (10)</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold">View full schedule &rarr;</button>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-gray-50">
            {nextAppointments.length > 0 ? nextAppointments.map((appt: Incident) => (
              <li key={appt.id} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-3 h-12 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400 opacity-80 group-hover:opacity-100"></div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{getPatientName(appt.patientId)}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="font-medium text-indigo-600">{appt.title}</span> • {new Date(appt.appointmentDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm transition-all focus:outline-none">
                  <MoreHorizontal size={20} />
                </button>
              </li>
            )) : (
              <div className="p-8 text-center text-gray-400 font-medium">
                No upcoming appointments. Schedule one from the calendar.
              </div>
            )}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardPage;