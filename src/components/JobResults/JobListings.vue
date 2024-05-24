<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <RouterLink
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</RouterLink
          >
          <RouterLink
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</RouterLink
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLink } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

const route = useRoute()
const jobsStore = useJobsStore()

const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10))
const filteredJobs = computed(() => jobsStore.filteredJobs)
const currentPage = computed(() => {
  return Number.parseInt(route.query.page || '1')
})

const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return filteredJobs.value.slice(firstJobIndex, lastJobIndex)
})

onMounted(async () => {
  await jobsStore.FETCH_JOBS()
})
</script>
