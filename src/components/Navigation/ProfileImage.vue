<template>
  <img :src="imageLink" class="h-8 w-8 rounded-3xl object-contain" alt="User profile image" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileImage',
  data() {
    return {
      imageLink:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/40235380-5053-409e-b290-916dc4e2e48a/d7fn973-5e305ed1-0a83-4e28-ad55-4bb49799195d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQwMjM1MzgwLTUwNTMtNDA5ZS1iMjkwLTkxNmRjNGUyZTQ4YVwvZDdmbjk3My01ZTMwNWVkMS0wYTgzLTRlMjgtYWQ1NS00YmI0OTc5OTE5NWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EuxsLbYwwVjvELPoJOyDXy4duAQquf4HfZP4g5OArfo'
    }
  }
})
</script>
