<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Users Management</h1>
        <p class="text-gray-600">Manage all users in your system</p>
      </div>
      <button @click="openAddUserModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add New User
      </button>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-500 text-sm mb-1">Total Users</p>
        <p class="text-3xl font-bold text-gray-800">{{ stats.total }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-500 text-sm mb-1">Active</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.active }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-500 text-sm mb-1">Inactive</p>
        <p class="text-3xl font-bold text-orange-600">{{ stats.inactive }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-500 text-sm mb-1">New This Month</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.newThisMonth }}</p>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <input 
              v-model="filters.search"
              type="text" 
              placeholder="Search by name, email, or ID..." 
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select v-model="filters.role" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="filters.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Join Date</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="`w-10 h-10 ${user.avatarBg} rounded-full flex items-center justify-center`">
                    <span :class="`${user.avatarText} font-semibold text-sm`">{{ user.initials }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 ${getRoleBadgeClass(user.role)} rounded-full text-sm font-medium`">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ user.department }}</td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 ${getStatusBadgeClass(user.status)} rounded-full text-sm font-medium`">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ formatDate(user.joinDate) }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }} of {{ filteredUsers.length }} users
        </p>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50">
            Previous
          </button>
          <button @click="currentPage++" :disabled="currentPage * itemsPerPage >= filteredUsers.length" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Stats data
const stats = ref({
  total: 1234,
  active: 1156,
  inactive: 58,
  newThisMonth: 45
});

// Filters
const filters = ref({
  search: '',
  role: '',
  status: ''
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Mock users data - Ganti dengan API call
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT Department',
    status: 'Active',
    joinDate: '2024-01-15',
    initials: 'JD',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-600'
  },
  {
    id: 2,
    name: 'Alice Smith',
    email: 'alice.smith@company.com',
    role: 'Manager',
    department: 'Sales',
    status: 'Active',
    joinDate: '2024-02-01',
    initials: 'AS',
    avatarBg: 'bg-green-100',
    avatarText: 'text-green-600'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    role: 'Employee',
    department: 'Marketing',
    status: 'Inactive',
    joinDate: '2023-12-10',
    initials: 'BJ',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-600'
  },
  {
    id: 4,
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    role: 'Cashier',
    department: 'Store Operations',
    status: 'Active',
    joinDate: '2024-01-20',
    initials: 'MG',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-600'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@company.com',
    role: 'Manager',
    department: 'Operations',
    status: 'Active',
    joinDate: '2023-11-05',
    initials: 'DL',
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-600'
  }
]);

// Computed filtered users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchSearch = !filters.value.search || 
      user.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.value.search.toLowerCase());
    
    const matchRole = !filters.value.role || user.role === filters.value.role;
    const matchStatus = !filters.value.status || user.status === filters.value.status;
    
    return matchSearch && matchRole && matchStatus;
  });
});

// Helper functions
const getRoleBadgeClass = (role) => {
  const classes = {
    'Admin': 'bg-purple-100 text-purple-700',
    'Manager': 'bg-blue-100 text-blue-700',
    'Employee': 'bg-green-100 text-green-700',
    'Cashier': 'bg-orange-100 text-orange-700'
  };
  return classes[role] || 'bg-gray-100 text-gray-700';
};

const getStatusBadgeClass = (status) => {
  const classes = {
    'Active': 'bg-green-100 text-green-700',
    'Inactive': 'bg-gray-100 text-gray-700',
    'Suspended': 'bg-red-100 text-red-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Actions
const openAddUserModal = () => {
  console.log('Open add user modal');
  // Implement modal logic
};

const editUser = (user) => {
  console.log('Edit user:', user);
  // Implement edit logic
};

const deleteUser = (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(u => u.id !== userId);
  }
};

// API Integration example - uncomment when ready
/*
import { onMounted } from 'vue';

const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(() => {
  fetchUsers();
});
*/
</script>