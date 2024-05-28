<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <div class="text-sm">
      <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      <span
        ><span class="text-brand-green-1">{{ jobsMatched }}</span> jobs matched</span
      >
    </div>
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <div class="flex">
          <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        </div>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" @click="userStore.clearJobFilters" />
        </div>
      </div>
      <JobFiltersSideBarSkills />
      <JobFiltersSidebarCheckboxGroup
        header="Degrees"
        :unique-values="uniqueDegrees"
        :action="userStore.addSelectedDegrees"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Job Types"
        :unique-values="uniqueJobTypes"
        :action="userStore.addSelectedJobTypes"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :action="userStore.addSelectedOrganizations"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'
import JobFiltersSideBarSkills from './JobFiltersSideBarSkills.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreesStore = useDegreesStore()
const route = useRoute()

const uniqueOrganizations = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
const uniqueJobTypes = computed(() => jobsStore.UNIQUE_JOB_TYPES)
const uniqueDegrees = computed(() => degreesStore.uniqueDegrees)
const jobsMatched = computed(() => {
  return jobsStore.filteredJobs.length
})

const parseJobSearchResult = () => {
  const role = (route.query.role as string) || ''
  const location = (route.query.location as string) || ''
  userStore.updateSkillsSearchTerm(role)
  userStore.updateLocationSearch(location)
}

onMounted(() => {
  parseJobSearchResult()
})
</script>
