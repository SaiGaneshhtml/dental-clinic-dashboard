import { users, patients, incidents } from './mockData';

export const seedInitialData = () => {
  // Always update users list so credential changes take effect immediately
  localStorage.setItem('users', JSON.stringify(users));
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(patients));
  }
  if (!localStorage.getItem('incidents')) {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }
}; 