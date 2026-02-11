<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Point of Sale</h1>
        <p class="text-gray-600">Manage sales transactions and inventory</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Transaction
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Today's Sales</p>
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ formatCurrency(posStats.todaySales) }}</p>
        <p class="text-sm text-green-600 mt-1">+{{ posStats.salesGrowth }}% from yesterday</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Transactions</p>
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ posStats.transactions }}</p>
        <p class="text-sm text-blue-600 mt-1">{{ posStats.avgTransactionValue }} avg value</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Products Sold</p>
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ posStats.productsSold }}</p>
        <p class="text-sm text-purple-600 mt-1">Across all categories</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-2">
          <p class="text-gray-500 text-sm">Top Cashier</p>
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
        </div>
        <p class="text-xl font-bold text-gray-800">{{ posStats.topCashier }}</p>
        <p class="text-sm text-orange-600 mt-1">{{ posStats.topCashierSales }} sales today</p>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Transaction</label>
          <div class="relative">
            <input 
              v-model="filters.search"
              type="text" 
              placeholder="Search by invoice, customer, cashier..." 
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <input 
            v-model="filters.dateFrom"
            type="date" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select v-model="filters.paymentMethod" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="E-Wallet">E-Wallet</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="filters.status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cashier</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <span class="font-medium text-blue-600">{{ transaction.invoice }}</span>
              </td>
              <td class="px-6 py-4 text-gray-700 text-sm">
                <div>{{ formatDate(transaction.date) }}</div>
                <div class="text-gray-500">{{ transaction.time }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-800 font-medium">{{ transaction.customer }}</div>
                <div class="text-sm text-gray-500">{{ transaction.customerPhone }}</div>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ transaction.cashier }}</td>
              <td class="px-6 py-4 text-gray-700">{{ transaction.itemCount }} items</td>
              <td class="px-6 py-4">
                <span class="font-bold text-gray-800">{{ formatCurrency(transaction.total) }}</span>
              </td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 ${getPaymentMethodClass(transaction.paymentMethod)} rounded-full text-sm font-medium`">
                  {{ transaction.paymentMethod }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 ${getTransactionStatusClass(transaction.status)} rounded-full text-sm font-medium`">
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="viewTransaction(transaction)" class="text-blue-600 hover:text-blue-800 mr-3">View</button>
                <button @click="printReceipt(transaction)" class="text-green-600 hover:text-green-800">Print</button>
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

// POS Stats
const posStats = ref({
  todaySales: 45200000,
  salesGrowth: 8,
  transactions: 156,
  avgTransactionValue: 'Rp 289.7K',
  productsSold: 423,
  topCashier: 'Alice Smith',
  topCashierSales: 45
});

// Filters
const filters = ref({
  search: '',
  dateFrom: new Date().toISOString().split('T')[0],
  paymentMethod: '',
  status: ''
});

// Mock transactions data
const transactions = ref([
  {
    id: 1,
    invoice: 'INV-2024-0001',
    date: '2024-02-11',
    time: '10:30 AM',
    customer: 'John Customer',
    customerPhone: '+62 812-3456-7890',
    cashier: 'Alice Smith',
    itemCount: 5,
    total: 450000,
    paymentMethod: 'Cash',
    status: 'Completed'
  },
  {
    id: 2,
    invoice: 'INV-2024-0002',
    date: '2024-02-11',
    time: '11:15 AM',
    customer: 'Sarah Johnson',
    customerPhone: '+62 813-9876-5432',
    cashier: 'Bob Williams',
    itemCount: 3,
    total: 280000,
    paymentMethod: 'Card',
    status: 'Completed'
  },
  {
    id: 3,
    invoice: 'INV-2024-0003',
    date: '2024-02-11',
    time: '12:00 PM',
    customer: 'Michael Brown',
    customerPhone: '+62 814-5555-6666',
    cashier: 'Alice Smith',
    itemCount: 8,
    total: 625000,
    paymentMethod: 'E-Wallet',
    status: 'Completed'
  },
  {
    id: 4,
    invoice: 'INV-2024-0004',
    date: '2024-02-11',
    time: '01:30 PM',
    customer: 'Emma Davis',
    customerPhone: '+62 815-7777-8888',
    cashier: 'Charlie Lee',
    itemCount: 2,
    total: 150000,
    paymentMethod: 'Cash',
    status: 'Pending'
  },
  {
    id: 5,
    invoice: 'INV-2024-0005',
    date: '2024-02-10',
    time: '03:45 PM',
    customer: 'David Miller',
    customerPhone: '+62 816-9999-0000',
    cashier: 'Alice Smith',
    itemCount: 4,
    total: 380000,
    paymentMethod: 'Card',
    status: 'Refunded'
  }
]);

// Filtered transactions
const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const matchSearch = !filters.value.search || 
      transaction.invoice.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      transaction.cashier.toLowerCase().includes(filters.value.search.toLowerCase());
    
    const matchPayment = !filters.value.paymentMethod || transaction.paymentMethod === filters.value.paymentMethod;
    const matchStatus = !filters.value.status || transaction.status === filters.value.status;
    
    return matchSearch && matchPayment && matchStatus;
  });
});

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getPaymentMethodClass = (method) => {
  const classes = {
    'Cash': 'bg-green-100 text-green-700',
    'Card': 'bg-blue-100 text-blue-700',
    'E-Wallet': 'bg-purple-100 text-purple-700'
  };
  return classes[method] || 'bg-gray-100 text-gray-700';
};

const getTransactionStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-700',
    'Pending': 'bg-orange-100 text-orange-700',
    'Refunded': 'bg-red-100 text-red-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};

// Actions
const viewTransaction = (transaction) => {
  console.log('View transaction:', transaction);
};

const printReceipt = (transaction) => {
  console.log('Print receipt for:', transaction.invoice);
};
</script>