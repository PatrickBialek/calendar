<template>
  <div id="app">
    <Calendar currency="zł" :price="298" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar/Calendar.vue";

export default {
  data() {
    return {
      translations: {
        checkIn: "Check In",
        checkOut: "Check Out",
        dates: "Dates",
      },
    };
  },
  components: { Calendar },
};
</script>

<style lang="scss">
body {
  background-color: $gray;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
