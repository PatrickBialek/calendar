<template>
  <div id="app">
    <Calendar
      currency="zł"
      :booked-days="bookedDays"
      :daysOfWeek="daysOfWeek"
      :months="months"
      :price="298"
      :translations="translations"
    />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar/Calendar.vue";

export default {
  data() {
    return {
      // example of booked days
      bookedDays: [
        { date: "2021-05-21" },
        { date: "2021-05-31" },
        { date: "2021-06-20" },
        { date: "2021-06-21" },
        { date: "2021-07-05" },
      ],
      daysOfWeek: [
        { name: "Sun" },
        { name: "Mon" },
        { name: "Tue" },
        { name: "Wed" },
        { name: "Thu" },
        { name: "Fri" },
        { name: "Sat" },
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
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
