import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { useData, type Incident } from '../contexts/DataContext';
import EditPatientForm from '../components/patients/EditPatientForm';
import Modal from '../components/common/Modal';
import { useState } from 'react';
import { CalendarHeart, User, Calendar, Fingerprint, Phone, HeartPulse, Edit3 } from 'lucide-react';

const PatientDashboardPage = () => {
  const { user } = useAuth();
  const { getIncidentsByPatient, patients, editPatient } = useData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const patientIncidents = user?.patientId ? getIncidentsByPatient(user.patientId) : [];
  const upcomingAppointments = patientIncidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 5); // Show next 5

  // Get patient details
  const patientDetails = user?.role === 'Patient' && user.patientId 
    ? patients.find(p => p.id === user.patientId) 
    : null;

  return (
    <MainLayout>
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Dashboard</h1>
        <p className="text-gray-500 text-lg">Manage your personal information and upcoming visits.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Patient Details */}
        <div className="lg:col-span-1 space-y-6">
          {patientDetails && (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-indigo-100/40 p-8 border border-white relative overflow-hidden transition-all hover:shadow-indigo-200/50">
               {/* Decorative subtle gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[40px] opacity-70"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Patient Profile</h2>
                  <p className="text-indigo-500 text-sm font-medium">ID: #{patientDetails.id}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                    <Fingerprint size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Full Name</p>
                    <p className="text-gray-900 font-medium">{patientDetails.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Date of Birth</p>
                    <p className="text-gray-900 font-medium">{patientDetails.dob}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Contact</p>
                    <p className="text-gray-900 font-medium">{patientDetails.contact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                    <HeartPulse size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Health Info</p>
                    <p className="text-gray-900 font-medium">{patientDetails.healthInfo}</p>
                  </div>
                </div>
              </div>

              <button
                className="mt-8 flex items-center justify-center gap-2 w-full py-3 text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white font-medium transition-all shadow-sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit3 size={18} />
                Edit My Info
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-indigo-100/40 p-8 border border-white h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                <CalendarHeart size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appt: Incident) => (
                  <div key={appt.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center shrink-0">
                         <span className="text-xs font-bold text-indigo-600 uppercase">
                          {new Date(appt.appointmentDate).toLocaleString('default', { month: 'short' })}
                         </span>
                         <span className="text-lg font-bold text-gray-900 leading-none">
                          {new Date(appt.appointmentDate).getDate()}
                         </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{appt.title}</p>
                        <p className="text-sm text-gray-500 font-medium">
                          {new Date(appt.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    {appt.cost ? (
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ${appt.cost}
                        </span>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                  <CalendarHeart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium">You have no upcoming appointments.</p>
                  <p className="text-gray-400 mt-1">Contact the clinic to schedule a visit.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit My Information"
      >
        {patientDetails && (
          <EditPatientForm
            patient={patientDetails}
            onEdit={(updatedPatient) => {
              editPatient(updatedPatient);
              setIsEditModalOpen(false);
            }}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </MainLayout>
  );
};

export default PatientDashboardPage;