'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  appointmentDate: string;
  reasonForVisit: string;
  additionalNotes: string;
  preferedContact: boolean;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const EVENT_COLORS = [
  { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
  { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', dot: 'bg-green-500' },
  { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-500' },
  { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', dot: 'bg-orange-500' },
  { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300', dot: 'bg-pink-500' },
  { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300', dot: 'bg-teal-500' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300', dot: 'bg-indigo-500' },
];

function getColorForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return EVENT_COLORS[Math.abs(hash) % EVENT_COLORS.length];
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay());
    return d;
  });

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointment');
        const data = await res.json();
        if (data.appointments) {
          setAppointments(data.appointments);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    appointments.forEach((apt) => {
      const date = new Date(apt.appointmentDate);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(apt);
    });
    // Sort each day's appointments by time
    Object.values(map).forEach((dayAppts) => {
      dayAppts.sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
    });
    return map;
  }, [appointments]);

  function navigateMonth(direction: number) {
    setCurrentDate(new Date(year, month + direction, 1));
  }

  function goToToday() {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay());
    setSelectedWeekStart(d);
  }

  function navigateWeek(direction: number) {
    setSelectedWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + direction * 7);
      return next;
    });
  }

  function isToday(day: number, m: number, y: number) {
    return day === today.getDate() && m === today.getMonth() && y === today.getFullYear();
  }

  // Build month grid cells
  const calendarCells: Array<{ day: number; month: number; year: number; isCurrentMonth: boolean }> = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    calendarCells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, month, year, isCurrentMonth: true });
  }
  // Next month leading days
  const remaining = 42 - calendarCells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    calendarCells.push({ day: d, month: m, year: y, isCurrentMonth: false });
  }

  // Week view dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(selectedWeekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

  // Mini calendar for sidebar
  function MiniCalendar() {
    const miniYear = currentDate.getFullYear();
    const miniMonth = currentDate.getMonth();
    const miniDaysInMonth = getDaysInMonth(miniYear, miniMonth);
    const miniFirstDay = getFirstDayOfMonth(miniYear, miniMonth);

    return (
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800">
            {MONTHS[miniMonth]} {miniYear}
          </span>
          <div className="flex gap-1">
            <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
          ))}
          {Array.from({ length: miniFirstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center text-xs py-1" />
          ))}
          {Array.from({ length: miniDaysInMonth }, (_, i) => i + 1).map((day) => {
            const isTodayMini = isToday(day, miniMonth, miniYear);
            const key = `${miniYear}-${miniMonth}-${day}`;
            const hasAppts = appointmentsByDate[key] && appointmentsByDate[key].length > 0;
            return (
              <button key={day} onClick={() => { setCurrentDate(new Date(miniYear, miniMonth, 1)); }}
                className={`text-center text-xs py-1 rounded-full w-7 h-7 mx-auto flex items-center justify-center relative ${isTodayMini ? 'bg-blue-600 text-white font-bold' : 'text-gray-700 hover:bg-gray-100'} `}>
                {day}
                {hasAppts && !isTodayMini && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Upcoming appointments sidebar
  function UpcomingAppointments() {
    const upcoming = appointments
      .filter((a) => new Date(a.appointmentDate) >= today)
      .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
      .slice(0, 5);

    return (
      <div className="bg-white rounded-xl p-4 mt-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Appointments</h3>
        {upcoming.length === 0 ? (
          <p className="text-xs text-gray-400">No upcoming appointments</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((apt) => {
              const color = getColorForId(apt.id);
              const date = new Date(apt.appointmentDate);
              return (
                <button
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className={`w-full text-left p-2.5 rounded-lg border ${color.bg} ${color.border} hover:opacity-80 transition`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color.dot} shrink-0`} />
                    <span className={`text-xs font-semibold ${color.text} truncate`}>{apt.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {formatTime(apt.appointmentDate)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 ml-4 truncate">{apt.reasonForVisit}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={goToToday} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">Today</button>
              <div className="flex items-center gap-1">
                <button onClick={() => (view === 'month' ? navigateMonth(-1) : navigateWeek(-1))} className="p-2 hover:bg-gray-200 rounded-full transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={() => (view === 'month' ? navigateMonth(1) : navigateWeek(1))} className="p-2 hover:bg-gray-200 rounded-full transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                {view === 'month'
                  ? `${MONTHS[month]} ${year}`
                  : `${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                }
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setView('month')} className={`px-4 py-2 text-sm font-medium transition ${view === 'month' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Month
                </button>
                <button onClick={() => setView('week')} className={`px-4 py-2 text-sm font-medium transition ${view === 'week' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>Week</button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <MiniCalendar />
              <UpcomingAppointments />
            </div>

            {/* Main Calendar */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading appointments...</p>
                  </div>
                </div>
              ) : view === 'month' ? (
                /* MONTH VIEW */
                <div>
                  {/* Day headers */}
                  <div className="grid grid-cols-7 border-b border-gray-200">
                    {DAYS.map((day) => (
                      <div key={day} className="px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">{day}</div>
                    ))}
                  </div>
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7">
                    {calendarCells.map((cell, idx) => {
                      const key = `${cell.year}-${cell.month}-${cell.day}`;
                      const dayAppointments = appointmentsByDate[key] || [];
                      const isTodayCell = isToday(cell.day, cell.month, cell.year);

                      return (
                        <div key={idx} className={`min-h-[120px] border-b border-r border-gray-100 p-1.5 transition-colors ${!cell.isCurrentMonth ? 'bg-gray-50' : 'bg-white hover:bg-blue-50/30'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${isTodayCell ? 'bg-blue-600 text-white font-bold' : ''} ${!cell.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'}`}>{cell.day}</span>
                            {dayAppointments.length > 0 && (
                              <span className="text-xs text-gray-400 mt-1">{dayAppointments.length}</span>
                            )}
                          </div>
                          <div className="space-y-0.5">
                            {dayAppointments.slice(0, 3).map((apt) => {
                              const color = getColorForId(apt.id);
                              return (
                                <button key={apt.id} onClick={() => setSelectedAppointment(apt)} className={`w-full text-left px-2 py-1 rounded-md text-xs truncate border-l-2 ${color.bg} ${color.text} ${color.border} hover:opacity-75 transition`}>
                                  <span className="font-medium">{formatTime(apt.appointmentDate)}</span>{' '}
                                  {apt.name}
                                </button>
                              );
                            })}
                            {dayAppointments.length > 3 && (
                              <button key={`more-${cell.day}`} className="text-xs text-blue-600 hover:text-blue-800 pl-2 font-medium" onClick={() => setSelectedAppointment(dayAppointments[3])}>
                                +{dayAppointments.length - 3} more
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* WEEK VIEW */
                <div>
                  {/* Week header */}
                  <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="border-r border-gray-200" />
                    {weekDates.map((date, i) => {
                      const isTodayCol = isToday(date.getDate(), date.getMonth(), date.getFullYear());
                      return (
                        <div key={i} className="px-2 py-3 text-center border-r border-gray-100 last:border-r-0">
                          <div className="text-xs text-gray-500 font-medium uppercase">{DAYS[i]}</div>
                          <div className={`text-xl font-semibold mt-1 w-10 h-10 mx-auto flex items-center justify-center rounded-full ${isTodayCol ? 'bg-blue-600 text-white' : 'text-gray-800'}`}>
                            {date.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Time grid */}
                  <div className="overflow-y-auto max-h-[600px]">
                    {hours.map((hour) => (
                      <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100">
                        <div className="px-2 py-4 text-xs text-gray-400 text-right pr-3 border-r border-gray-200">
                          {hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
                          {hour === 12 && ' PM'}
                        </div>
                        {weekDates.map((date, colIdx) => {
                          const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                          const dayAppts = appointmentsByDate[key] || [];
                          const hourAppts = dayAppts.filter((apt) => {
                            const aptDate = new Date(apt.appointmentDate);
                            return aptDate.getHours() === hour;
                          });
                          return (
                            <div key={colIdx} className="border-r border-gray-100 last:border-r-0 min-h-[60px] p-0.5 relative">
                              {hourAppts.map((apt) => {
                                const color = getColorForId(apt.id);
                                return (
                                  <button key={apt.id} onClick={() => setSelectedAppointment(apt)} className={`w-full text-left p-1.5 rounded-md text-xs ${color.bg} ${color.text} border-l-2 ${color.border} hover:opacity-75 transition mb-0.5`}>
                                    <div className="font-medium truncate">{apt.name}</div>
                                    <div className="text-[10px] opacity-75">{formatTime(apt.appointmentDate)}</div>
                                  </button>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedAppointment(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className={`px-6 py-4 ${getColorForId(selectedAppointment.id).bg}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${getColorForId(selectedAppointment.id).text}`}>Appointment Details</h2>
                <button onClick={() => setSelectedAppointment(null)} className="p-1 hover:bg-black/10 rounded-full transition">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorForId(selectedAppointment.id).bg}`}>
                  <svg className={`w-5 h-5 ${getColorForId(selectedAppointment.id).text}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedAppointment.name}</p>
                  <p className="text-sm text-gray-500">{selectedAppointment.email}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(selectedAppointment.appointmentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{formatTime(selectedAppointment.appointmentDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-sm text-gray-700">{selectedAppointment.phoneNumber}</p>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    Preferred: {selectedAppointment.preferedContact ? 'Phone' : 'Email'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Reason for Visit</h4>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedAppointment.reasonForVisit}</p>
              </div>

              {selectedAppointment.additionalNotes && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Additional Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedAppointment.additionalNotes}</p>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setSelectedAppointment(null)} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition" > Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
