<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
        <p class="text-gray-600">Stay updated with system alerts and messages</p>
      </div>
      <div class="flex gap-3">
        <button @click="markAllAsRead" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all">
          Mark All as Read
        </button>
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-all">
          Settings
        </button>
      </div>
    </div>

    <!-- Notification Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Total</p>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ notificationStats.total }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Unread</p>
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-orange-600">{{ notificationStats.unread }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">High Priority</p>
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-red-600">{{ notificationStats.highPriority }}</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Today</p>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-green-600">{{ notificationStats.today }}</p>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="bg-white rounded-lg shadow-md mb-6">
      <div class="flex border-b border-gray-200">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-4 font-medium transition-colors',
            activeTab === tab.id 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          ]"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            {{ tab.count }}
          </span>
        </button>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div 
          v-for="notification in filteredNotifications" 
          :key="notification.id"
          @click="openNotification(notification)"
          :class="[
            'px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer',
            !notification.read ? 'bg-blue-50' : ''
          ]"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div :class="`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`">
              <svg class="w-6 h-6" :class="notification.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="notification.iconPath"/>
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between mb-1">
                <div class="flex items-center gap-2">
                  <h4 :class="['font-semibold text-gray-800', !notification.read ? 'font-bold' : '']">
                    {{ notification.title }}
                  </h4>
                  <span v-if="!notification.read" class="w-2 h-2 bg-blue-600 rounded-full"></span>
                </div>
                <span class="text-sm text-gray-500 flex-shrink-0 ml-4">{{ notification.timestamp }}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ notification.message }}</p>
              <div class="flex items-center gap-3">
                <span :class="`px-2 py-1 ${notification.categoryBadge} rounded-full text-xs font-medium`">
                  {{ notification.category }}
                </span>
                <span v-if="notification.priority === 'high'" class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  High Priority
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 flex-shrink-0">
              <button 
                v-if="!notification.read"
                @click.stop="markAsRead(notification.id)"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Mark as read"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
              <button 
                @click.stop="deleteNotification(notification.id)"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Delete"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredNotifications.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <p class="text-gray-500">No notifications found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Notification stats
const notificationStats = ref({
  total: 47,
  unread: 12,
  highPriority: 3,
  today: 18
});

// Active tab
const activeTab = ref('all');

// Filter tabs
const filterTabs = ref([
  { id: 'all', label: 'All', count: 47 },
  { id: 'unread', label: 'Unread', count: 12 },
  { id: 'system', label: 'System', count: null },
  { id: 'attendance', label: 'Attendance', count: null },
  { id: 'sales', label: 'Sales', count: null },
  { id: 'alerts', label: 'Alerts', count: null }
]);

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: 'Payment Gateway Issue',
    message: 'Connection to payment gateway needs attention. Last sync failed 1 hour ago.',
    timestamp: '1 hour ago',
    category: 'System',
    categoryBadge: 'bg-red-100 text-red-700',
    priority: 'high',
    read: false,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  {
    id: 2,
    title: 'New POS Transaction',
    message: 'Transaction INV-2024-0156 completed. Amount: Rp 625,000',
    timestamp: '2 hours ago',
    category: 'Sales',
    categoryBadge: 'bg-green-100 text-green-700',
    priority: 'normal',
    read: false,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 3,
    title: 'Late Check-in Alert',
    message: '5 employees checked in late today. Review attendance records.',
    timestamp: '3 hours ago',
    category: 'Attendance',
    categoryBadge: 'bg-orange-100 text-orange-700',
    priority: 'high',
    read: false,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 4,
    title: 'Monthly Report Ready',
    message: 'Your monthly sales report for January 2024 has been generated and is ready to download.',
    timestamp: '5 hours ago',
    category: 'System',
    categoryBadge: 'bg-blue-100 text-blue-700',
    priority: 'normal',
    read: true,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    id: 5,
    title: 'Integration Sync Completed',
    message: 'Absensi System successfully synced 156 attendance records.',
    timestamp: '6 hours ago',
    category: 'System',
    categoryBadge: 'bg-blue-100 text-blue-700',
    priority: 'normal',
    read: true,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
  },
  {
    id: 6,
    title: 'Low Stock Alert',
    message: '3 products are running low on stock. Consider reordering soon.',
    timestamp: '1 day ago',
    category: 'Alerts',
    categoryBadge: 'bg-yellow-100 text-yellow-700',
    priority: 'normal',
    read: true,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    id: 7,
    title: 'New User Registered',
    message: 'Sarah Johnson has been added to the system as a Sales Manager.',
    timestamp: '1 day ago',
    category: 'System',
    categoryBadge: 'bg-blue-100 text-blue-700',
    priority: 'normal',
    read: true,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
  },
  {
    id: 8,
    title: 'Daily Sales Target Achieved',
    message: 'Congratulations! Today\'s sales target of Rp 40M has been exceeded.',
    timestamp: '2 days ago',
    category: 'Sales',
    categoryBadge: 'bg-green-100 text-green-700',
    priority: 'normal',
    read: true,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  }
]);

// Filtered notifications
const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') {
    return notifications.value;
  } else if (activeTab.value === 'unread') {
    return notifications.value.filter(n => !n.read);
  } else {
    return notifications.value.filter(n => n.category.toLowerCase() === activeTab.value);
  }
});

// Actions
const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    notificationStats.value.unread--;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
  notificationStats.value.unread = 0;
};

const deleteNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index > -1) {
    const notification = notifications.value[index];
    if (!notification.read) {
      notificationStats.value.unread--;
    }
    notifications.value.splice(index, 1);
    notificationStats.value.total--;
  }
};

const openNotification = (notification) => {
  if (!notification.read) {
    markAsRead(notification.id);
  }
  console.log('Open notification:', notification);
};
</script>