<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer programing, finance degree"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore()
const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  set(value: string){
    userStore.updateSkillsSearchTerm(value)
  }
})
</script>
