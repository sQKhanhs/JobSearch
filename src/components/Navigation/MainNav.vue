<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 mx-auto">
        <a :href="url" class="flex h-full items-center text-xl">{{ company }}</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem" class="ml-9 first:ml-0 h-full">
              <a href="" class="flex h-full items-center py-2.5">{{ menuItem }}</a>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign in" type="primary" @click="loginUser" />
        </div>
      </div>

      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav
  },
  data() {
    return {
      company: 'Senni Careers',
      url: 'https://careers.google.com',
      menuItems: ['Teams', 'Locations', 'Life at Senni Corp', 'How we hire', 'Students', 'Jobs'],
      isLoggedIn: false
    }
  },
  computed: {
    headerHeightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      }
    }
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
}
</script>
