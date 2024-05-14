<template>
  <main class="flex flex-col h-screen">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>

        <div class="col-start-2 col-span-5">
          <TheHeadLine />
          <JobSearchForm />
        </div>

        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            class="h-80 w-80 object-contain"
            src="https://www.gstatic.com/hiring/CportalUi/hero_4_2x.png"
          />
        </div>
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>

    <SpotLight class="flex flex-row justify-center pb-16">
      <template #default="slotProps">
        <RouterLink
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
        >
          <img :src="slotProps.spotlight.img" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">
              {{ slotProps.spotlight.title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ slotProps.spotlight.description }}
            </p>
          </div>
          <RouterLink to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See jobs</RouterLink
          >
        </RouterLink>
      </template>
    </SpotLight>
  </main>
</template>

<script>
import TheHeadLine from '@/components/JobSearch/TheHeadLine.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import SpotLight from '@/components/JobSearch/SpotLight.vue'

export default {
  name: 'TheHero',
  components: {
    TheHeadLine,
    JobSearchForm,
    SpotLight
  }
}
</script>
