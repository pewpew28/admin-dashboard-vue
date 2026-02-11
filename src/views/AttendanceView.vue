<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Attendance Management</h1>
        <p class="text-gray-600">Track and manage employee attendance</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Manual Check-in
        </button>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Export Report
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Present Today</p>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ attendanceStats.present }}</p>
        <p class="text-sm text-green-600 mt-1">{{ attendanceStats.presentPercentage }}% of total</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Absent</p>
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ attendanceStats.absent }}</p>
        <p class="text-sm text-red-600 mt-1">{{ attendanceStats.absentPercentage }}% of total</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Late</p>
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ attendanceStats.late }}</p>
        <p class="text-sm text-orange-600 mt-1">Arrived after 9:00 AM</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">On Leave</p>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ attendanceStats.onLeave }}</p>
        <p class="text-sm text-blue-600 mt-1">Approved leave requests</p>
      </div>
    </div>

    <!-- Filter & Date Selection -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input 
            v-model="filters.date"
            type="date" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select v-model="filters.department" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Departments</option>
            <option value="IT Department">IT Department</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="filters.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input 
            v-model="filters.search"
            type="text" 
            placeholder="Search employee..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check In</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check Out</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Working Hours</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="record in filteredAttendance" :key="record.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="`w-10 h-10 ${record.avatarBg} rounded-full flex items-center justify-center`">
                    <span :class="`${record.avatarText} font-semibold text-sm`">{{ record.initials }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ record.employeeName }}</p>
                    <p class="text-sm text-gray-500">{{ record.employeeId }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ record.department }}</td>
              <td class="px-6 py-4">
                <span v-if="record.checkIn" :class="record.isLate ? 'text-orange-600 font-medium' : 'text-gray-700'">
                  {{ record.checkIn }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="record.checkOut" class="text-gray-700">{{ record.checkOut }}</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="record.workingHours" class="text-gray-700 font-medium">{{ record.workingHours }}</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 ${getAttendanceStatusClass(record.status)} rounded-full text-sm font-medium`">
                  {{ record.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-600">{{ record.notes || '-' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Attendance stats
const attendanceStats = ref({
  present: 856,
  presentPercentage: 98,
  absent: 12,
  absentPercentage: 1.4,
  late: 34,
  onLeave: 6
});

// Filters
const filters = ref({
  date: new Date().toISOString().split('T')[0],
  department: '',
  status: '',
  search: ''
});

// Mock attendance data
const attendanceRecords = ref([
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    department: 'IT Department',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    workingHours: '8h 45m',
    status: 'Present',
    isLate: false,
    notes: '',
    initials: 'JD',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-600'
  },
  {
    id: 2,
    employeeName: 'Alice Smith',
    employeeId: 'EMP002',
    department: 'Sales',
    checkIn: '09:15 AM',
    checkOut: '06:00 PM',
    workingHours: '8h 45m',
    status: 'Late',
    isLate: true,
    notes: 'Traffic jam',
    initials: 'AS',
    avatarBg: 'bg-green-100',
    avatarText: 'text-green-600'
  },
  {
    id: 3,
    employeeName: 'Bob Johnson',
    employeeId: 'EMP003',
    department: 'Marketing',
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: 'Absent',
    isLate: false,
    notes: 'No notification',
    initials: 'BJ',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-600'
  },
  {
    id: 4,
    employeeName: 'Maria Garcia',
    employeeId: 'EMP004',
    department: 'Store Operations',
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: 'On Leave',
    isLate: false,
    notes: 'Annual leave approved',
    initials: 'MG',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-600'
  },
  {
    id: 5,
    employeeName: 'David Lee',
    employeeId: 'EMP005',
    department: 'Operations',
    checkIn: '08:30 AM',
    checkOut: null,
    workingHours: null,
    status: 'Present',
    isLate: false,
    notes: 'Still working',
    initials: 'DL',
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-600'
  }
]);

// Filtered attendance
const filteredAttendance = computed(() => {
  return attendanceRecords.value.filter(record => {
    const matchSearch = !filters.value.search || 
      record.employeeName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(filters.value.search.toLowerCase());
    
    const matchDepartment = !filters.value.department || record.department === filters.value.department;
    const matchStatus = !filters.value.status || record.status === filters.value.status;
    
    return matchSearch && matchDepartment && matchStatus;
  });
});

// Helper function
const getAttendanceStatusClass = (status) => {
  const classes = {
    'Present': 'bg-green-100 text-green-700',
    'Absent': 'bg-red-100 text-red-700',
    'Late': 'bg-orange-100 text-orange-700',
    'On Leave': 'bg-blue-100 text-blue-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};
</script>