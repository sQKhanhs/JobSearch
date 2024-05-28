<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 mx-auto">
        <RouterLink to="/" class="flex h-full items-center text-xl">Senni Careers</RouterLink>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="ml-9 first:ml-0 h-full">
              <RouterLink :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign in" type="primary" @click="loginUser" />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Locations', url: '/' },
  { text: 'Life at Senni Corp', url: '/' },
  { text: 'How we hire', url: '/' },
  { text: 'Students', url: '/' },
  { text: 'Jobs', url: '/jobs/results' }
])

const isLoggedIn = computed(() => {
  return userStore.isLoggedIn
})

const headerHeightClass = computed(() => {
  return {
    'h-16': !isLoggedIn.value,
    'h-20': isLoggedIn.value
  }
})

const loginUser = () => userStore.loginUser()
</script>
