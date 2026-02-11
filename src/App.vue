<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { useSidebar } from './composables/useSidebar';


const { isSidebarHovered } = useSidebar()
</script>

<template>
  <div class="w-full h-screen bg-gray-50">
    <Header />
    <Sidebar />
    
    <main 
      class="pt-24 px-6 py-8 transition-all duration-300"
      :class="isSidebarHovered ? 'ml-64' : 'ml-20'"
    >
      <RouterView />
    </main>
  </div>
</template>