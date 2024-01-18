
<script setup>

import Login from './components/Login.vue'
import MyTable from './components/MyTable.vue'


</script>

<template>
  <main id='app'>
        <Login/>
        <MyTable/>
  </main>
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


