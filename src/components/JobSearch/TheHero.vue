<template>
  <main>
    <section class="flex flex-col h-screen pt-10 pb-20">
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
  </main>
</template>

<script>
import TheHeadLine from '@/components/JobSearch/TheHeadLine.vue'
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'

export default {
  name: 'TheHero',
  components: {
    TheHeadLine,
    JobSearchForm
  }
}
</script>
