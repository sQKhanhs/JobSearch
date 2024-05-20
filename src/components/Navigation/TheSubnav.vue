<template>
  <div class="w-full h-16 border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">{{ jobsMatched }}</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useJobsStore } from '@/stores/jobs';

const route = useRoute();
const jobsStore = useJobsStore();
const jobsMatched = computed(() => {
  return (jobsStore.filteredJobs).length;
})

const onJobResultsPage = computed(() => {
  return route.name == "JobResults"
})
</script>
