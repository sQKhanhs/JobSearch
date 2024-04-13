<template>
  <li class="mb-7">
    <RouterLink
      to="/jobs/results/1"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">Technical Program Manager, Perception, Augmented Reality</h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Senni</span>
          </div>

          <div>
            <span>Vietnam</span>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>BA</li>
              <li>5 years</li>
              <li>SQL, Data analyzing</li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <RouterLink to="/jobs/results/1" class="text-brand-blue-1">Expand</RouterLink>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script>
export default {
  name: 'JobListing'
}
</script>
