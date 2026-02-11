<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
      <p class="text-gray-600">Manage your system preferences and configurations</p>
    </div>

    <!-- Settings Tabs -->
    <div class="bg-white rounded-lg shadow-md mb-6">
      <div class="flex border-b border-gray-200 overflow-x-auto">
        <button 
          v-for="tab in settingsTabs" 
          :key="tab.id"
          @click="activeSettingsTab = tab.id"
          :class="[
            'px-6 py-4 font-medium whitespace-nowrap transition-colors flex items-center gap-2',
            activeSettingsTab === tab.id 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.iconPath"/>
          </svg>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- General Settings -->
    <div v-if="activeSettingsTab === 'general'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Company Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input 
              v-model="settings.general.companyName"
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="settings.general.email"
              type="email" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              v-model="settings.general.phone"
              type="tel" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input 
              v-model="settings.general.website"
              type="url" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea 
              v-model="settings.general.address"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">System Preferences</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">Language</p>
              <p class="text-sm text-gray-600">Select your preferred language</p>
            </div>
            <select v-model="settings.general.language" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">Timezone</p>
              <p class="text-sm text-gray-600">Set your local timezone</p>
            </div>
            <select v-model="settings.general.timezone" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
              <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
              <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">Currency</p>
              <p class="text-sm text-gray-600">Default currency for transactions</p>
            </div>
            <select v-model="settings.general.currency" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="IDR">IDR - Indonesian Rupiah</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div v-if="activeSettingsTab === 'security'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Password</h3>
        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input 
              type="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all">
            Update Password
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-800">Enable 2FA</p>
            <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input v-model="settings.security.twoFactorAuth" type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Active Sessions</h3>
        <div class="space-y-4">
          <div v-for="session in activeSessions" :key="session.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="session.iconPath"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ session.device }}</p>
                <p class="text-sm text-gray-600">{{ session.location }} • {{ session.lastActive }}</p>
              </div>
            </div>
            <button v-if="!session.current" class="text-red-600 hover:text-red-800 text-sm font-medium">
              Revoke
            </button>
            <span v-else class="text-green-600 text-sm font-medium">Current</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div v-if="activeSettingsTab === 'notifications'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h3>
        <div class="space-y-4">
          <div v-for="(value, key) in settings.notifications.email" :key="key" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">{{ formatNotificationLabel(key) }}</p>
              <p class="text-sm text-gray-600">Receive {{ formatNotificationLabel(key).toLowerCase() }} via email</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.notifications.email[key]" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Push Notifications</h3>
        <div class="space-y-4">
          <div v-for="(value, key) in settings.notifications.push" :key="key" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">{{ formatNotificationLabel(key) }}</p>
              <p class="text-sm text-gray-600">Receive {{ formatNotificationLabel(key).toLowerCase() }} as push notifications</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.notifications.push[key]" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Settings -->
    <div v-if="activeSettingsTab === 'attendance'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Working Hours</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Check-in Time</label>
            <input 
              v-model="settings.attendance.checkInTime"
              type="time" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Check-out Time</label>
            <input 
              v-model="settings.attendance.checkOutTime"
              type="time" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Late Tolerance (minutes)</label>
            <input 
              v-model="settings.attendance.lateTolerance"
              type="number" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Break Duration (minutes)</label>
            <input 
              v-model="settings.attendance.breakDuration"
              type="number" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Leave Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">Auto-approve Leave</p>
              <p class="text-sm text-gray-600">Automatically approve leave requests</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.attendance.autoApproveLeave" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Annual Leave Days</label>
            <input 
              v-model="settings.attendance.annualLeaveDays"
              type="number" 
              class="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- POS Settings -->
    <div v-if="activeSettingsTab === 'pos'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Receipt Settings</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Header</label>
            <textarea 
              v-model="settings.pos.receiptHeader"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Footer</label>
            <textarea 
              v-model="settings.pos.receiptFooter"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-800">Auto Print Receipt</p>
              <p class="text-sm text-gray-600">Automatically print receipt after transaction</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="settings.pos.autoPrintReceipt" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
        <div class="space-y-4">
          <div v-for="method in paymentMethods" :key="method.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 ${method.iconBg} rounded-lg flex items-center justify-center`">
                <svg class="w-6 h-6" :class="method.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.iconPath"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ method.name }}</p>
                <p class="text-sm text-gray-600">{{ method.description }}</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="method.enabled" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end gap-3">
      <button class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all">
        Cancel
      </button>
      <button @click="saveSettings" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Active tab
const activeSettingsTab = ref('general');

// Settings tabs
const settingsTabs = ref([
  {
    id: 'general',
    label: 'General',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  },
  {
    id: 'security',
    label: 'Security',
    iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
  },
  {
    id: 'attendance',
    label: 'Attendance',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'pos',
    label: 'POS',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
  }
]);

// Settings data
const settings = ref({
  general: {
    companyName: 'My Company',
    email: 'info@mycompany.com',
    phone: '+62 21 1234 5678',
    website: 'https://mycompany.com',
    address: 'Jl. Sudirman No. 123, Jakarta 12345',
    language: 'en',
    timezone: 'Asia/Jakarta',
    currency: 'IDR'
  },
  security: {
    twoFactorAuth: false
  },
  notifications: {
    email: {
      transactions: true,
      attendance: true,
      systemAlerts: true,
      weeklyReport: false
    },
    push: {
      transactions: false,
      attendance: true,
      systemAlerts: true,
      weeklyReport: false
    }
  },
  attendance: {
    checkInTime: '09:00',
    checkOutTime: '17:00',
    lateTolerance: 15,
    breakDuration: 60,
    autoApproveLeave: false,
    annualLeaveDays: 12
  },
  pos: {
    receiptHeader: 'Thank you for shopping with us!',
    receiptFooter: 'Visit us again soon!',
    autoPrintReceipt: true
  }
});

// Active sessions
const activeSessions = ref([
  {
    id: 1,
    device: 'Chrome on Windows',
    location: 'Jakarta, Indonesia',
    lastActive: '5 minutes ago',
    current: true,
    iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 2,
    device: 'Safari on iPhone',
    location: 'Jakarta, Indonesia',
    lastActive: '2 hours ago',
    current: false,
    iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  }
]);

// Payment methods
const paymentMethods = ref([
  {
    id: 1,
    name: 'Cash',
    description: 'Physical cash payments',
    enabled: true,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    id: 2,
    name: 'Credit/Debit Card',
    description: 'Card payments via EDC',
    enabled: true,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  },
  {
    id: 3,
    name: 'E-Wallet',
    description: 'Digital wallet payments (GoPay, OVO, Dana)',
    enabled: true,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: 4,
    name: 'Bank Transfer',
    description: 'Direct bank transfers',
    enabled: false,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
  }
]);

// Helper functions
const formatNotificationLabel = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

// Actions
const saveSettings = () => {
  console.log('Saving settings:', settings.value);
  alert('Settings saved successfully!');
};

// API Integration example
/*
const saveSettings = async () => {
  try {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings.value)
    });
    
    if (response.ok) {
      alert('Settings saved successfully!');
    } else {
      alert('Error saving settings');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving settings');
  }
};
*/
</script>