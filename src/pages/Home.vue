<script setup>
import Sidebar from '../components/Sidebar.vue'
import MyTable from '../components/MyTable.vue'
import Logo from "@/components/Logo.vue";
</script>

<template>
    <Logo/>
    <Sidebar/>
    <MyTable/>
</template>

<style scoped>
td {
  width: fit-content;
  max-width: 20%;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>