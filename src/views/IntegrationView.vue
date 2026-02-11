<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">System Integration</h1>
      <p class="text-gray-600">Manage connections with external systems and services</p>
    </div>

    <!-- Integration Status Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Total Integrations</p>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ integrationStats.total }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Active</p>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-green-600">{{ integrationStats.active }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Inactive</p>
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-600">{{ integrationStats.inactive }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Issues</p>
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-red-600">{{ integrationStats.issues }}</p>
      </div>
    </div>

    <!-- Active Integrations -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Active Integrations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="integration in integrations.filter(i => i.status === 'Active')" 
          :key="integration.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div :class="`w-12 h-12 ${integration.iconBg} rounded-lg flex items-center justify-center`">
                <svg class="w-7 h-7" :class="integration.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="integration.iconPath"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ integration.name }}</h3>
                <p class="text-sm text-gray-500">{{ integration.provider }}</p>
              </div>
            </div>
            <span :class="`w-3 h-3 rounded-full ${getStatusIndicator(integration.status)}`"></span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Last Sync</span>
              <span class="font-medium text-gray-800">{{ integration.lastSync }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">API Calls Today</span>
              <span class="font-medium text-gray-800">{{ integration.apiCalls }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Success Rate</span>
              <span class="font-medium text-green-600">{{ integration.successRate }}%</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button @click="configureIntegration(integration)" class="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
              Configure
            </button>
            <button @click="syncNow(integration)" class="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
              Sync Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Integrations -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-800">Available Integrations</h2>
        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All →
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="integration in integrations.filter(i => i.status === 'Inactive')" 
          :key="integration.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div :class="`w-12 h-12 ${integration.iconBg} rounded-lg flex items-center justify-center mb-4`">
            <svg class="w-7 h-7" :class="integration.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="integration.iconPath"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">{{ integration.name }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ integration.description }}</p>
          <button @click="connectIntegration(integration)" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Connect
          </button>
        </div>
      </div>
    </div>

    <!-- Integration Logs -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="font-semibold text-gray-800">Recent Integration Activity</h3>
        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Logs →
        </button>
      </div>
      <div class="divide-y divide-gray-200">
        <div 
          v-for="log in integrationLogs" 
          :key="log.id"
          class="px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start gap-4">
            <div :class="`w-10 h-10 ${log.statusBg} rounded-lg flex items-center justify-center flex-shrink-0`">
              <svg class="w-5 h-5" :class="log.statusColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="log.statusIcon"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <p class="font-medium text-gray-800">{{ log.integration }}</p>
                <span class="text-sm text-gray-500">{{ log.timestamp }}</span>
              </div>
              <p class="text-sm text-gray-600">{{ log.message }}</p>
              <div class="flex items-center gap-4 mt-2">
                <span class="text-xs text-gray-500">{{ log.endpoint }}</span>
                <span :class="`text-xs font-medium ${log.statusTextColor}`">{{ log.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Integration stats
const integrationStats = ref({
  total: 12,
  active: 8,
  inactive: 3,
  issues: 1
});

// Integrations list
const integrations = ref([
  {
    id: 1,
    name: 'Absensi System',
    provider: 'TimeTrack Pro',
    status: 'Active',
    lastSync: '2 min ago',
    apiCalls: 1234,
    successRate: 99.8,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    name: 'POS System',
    provider: 'RetailHub',
    status: 'Active',
    lastSync: '5 min ago',
    apiCalls: 856,
    successRate: 98.5,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    id: 3,
    name: 'Payment Gateway',
    provider: 'PaySecure',
    status: 'Active',
    lastSync: '1 hour ago',
    apiCalls: 445,
    successRate: 95.2,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  },
  {
    id: 4,
    name: 'Email Service',
    provider: 'SendGrid',
    status: 'Active',
    lastSync: '10 min ago',
    apiCalls: 678,
    successRate: 99.9,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 5,
    name: 'Accounting Software',
    provider: 'QuickBooks',
    status: 'Inactive',
    description: 'Sync financial data and transactions',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: 6,
    name: 'SMS Gateway',
    provider: 'Twilio',
    status: 'Inactive',
    description: 'Send notifications via SMS',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: 7,
    name: 'Cloud Storage',
    provider: 'Google Drive',
    status: 'Inactive',
    description: 'Backup and file management',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    iconPath: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  },
  {
    id: 8,
    name: 'Analytics Platform',
    provider: 'Google Analytics',
    status: 'Inactive',
    description: 'Track and analyze user behavior',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }
]);

// Integration logs
const integrationLogs = ref([
  {
    id: 1,
    integration: 'Absensi System',
    message: 'Successfully synced 156 attendance records',
    timestamp: '2 minutes ago',
    endpoint: 'POST /api/sync/attendance',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-600',
    statusTextColor: 'text-green-600',
    statusIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    integration: 'POS System',
    message: 'Transaction data synchronized',
    timestamp: '5 minutes ago',
    endpoint: 'POST /api/sync/transactions',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-600',
    statusTextColor: 'text-green-600',
    statusIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 3,
    integration: 'Payment Gateway',
    message: 'Authentication token refreshed',
    timestamp: '15 minutes ago',
    endpoint: 'POST /api/auth/refresh',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-600',
    statusTextColor: 'text-green-600',
    statusIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 4,
    integration: 'Payment Gateway',
    message: 'Connection timeout - retry scheduled',
    timestamp: '1 hour ago',
    endpoint: 'GET /api/status',
    status: 'Warning',
    statusBg: 'bg-yellow-100',
    statusColor: 'text-yellow-600',
    statusTextColor: 'text-yellow-600',
    statusIcon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  {
    id: 5,
    integration: 'Email Service',
    message: 'Sent 45 notification emails',
    timestamp: '2 hours ago',
    endpoint: 'POST /api/email/send-batch',
    status: 'Success',
    statusBg: 'bg-green-100',
    statusColor: 'text-green-600',
    statusTextColor: 'text-green-600',
    statusIcon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]);

// Helper functions
const getStatusIndicator = (status) => {
  const indicators = {
    'Active': 'bg-green-500 animate-pulse',
    'Inactive': 'bg-gray-400',
    'Error': 'bg-red-500 animate-pulse'
  };
  return indicators[status] || 'bg-gray-400';
};

// Actions
const configureIntegration = (integration) => {
  console.log('Configure integration:', integration);
  alert(`Opening configuration for ${integration.name}`);
};

const syncNow = (integration) => {
  console.log('Sync now:', integration);
  alert(`Syncing ${integration.name}...`);
};

const connectIntegration = (integration) => {
  console.log('Connect integration:', integration);
  alert(`Connecting to ${integration.name}...`);
};
</script>