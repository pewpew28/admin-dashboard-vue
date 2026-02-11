<template>
    <aside 
        @mouseenter="isSidebarHovered = true"
        @mouseleave="isSidebarHovered = false"
        class="fixed left-0 top-0 bottom-0 bg-white shadow-xl z-40 pt-20 transition-all duration-300 ease-in-out"
        :class="isSidebarHovered ? 'w-64' : 'w-20'"
    >
        <nav class="px-3 py-6">
            <!-- Loop menu dari config -->
            <RouterLink 
                v-for="item in menuItems" 
                :key="item.id"
                :to="item.path"
                class="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg group relative transition-colors"
                :class="$route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'"
            >
                <!-- Icon -->
                <SidebarIcon :name="item.icon" />
                
                <!-- Label Menu -->
                <span 
                    class="font-medium whitespace-nowrap transition-all duration-300"
                    :class="isSidebarHovered ? 'opacity-100' : 'opacity-0 w-0'"
                >
                    {{ item.name }}
                </span>

                <!-- Badge (jika ada) -->
                <span 
                    v-if="item.badge && isSidebarHovered"
                    class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full transition-all duration-300"
                >
                    {{ item.badge }}
                </span>
            </RouterLink>
        </nav>
    </aside>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar'
import { menuItems } from '@/config/menuConfig'
import SidebarIcon from './SidebarIcon.vue'

const { isSidebarHovered } = useSidebar()
</script>