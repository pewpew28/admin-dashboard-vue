import { ref } from "vue";

const isSidebarHovered = ref(false);

export function useSidebar() {
  return {
    isSidebarHovered,
  };
}
