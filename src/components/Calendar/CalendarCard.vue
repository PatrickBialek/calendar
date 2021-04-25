<template>
  <div class="calendar-card">
    <div class="calendar-card__content">
      <div class="calendar-card__heading">
        <button @click="changeMonth(-1)">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h3 class="heading-primary">
          {{ currentMonthName }} {{ currentYear }}
        </h3>
        <button @click="changeMonth(1)">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="calendar-card__body">
        <div class="calendar-card__table">
          <div class="calendar-card__day-of-week">
            <span
              v-for="(day, index) in daysOfWeek"
              :key="index + Math.random()"
            >
              {{ day.name }}
            </span>
          </div>
          <div class="calendar-card__dates">
            <span
              v-for="(i, index) in indexOfFirstDay - 1"
              :key="index + Math.random()"
              class="calendar-card__single-date calendar-card__single-date--disabled"
            >
              {{ lastMonthLength - indexOfFirstDay + 1 + i }}
            </span>
            <span
              v-for="(i, index) in currentMonthLength"
              @click="availabilityChecker($event.target, i)"
              :data-available="isShouldDisabled(i)"
              :key="index + Math.random()"
              class="calendar-card__single-date"
              >{{ i }}</span
            >
            <span
              v-for="(i, index) in daysFromNextMonth"
              :key="index + Math.random()"
              class="calendar-card__single-date calendar-card__single-date--disabled"
              >{{ i }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarCard",
  data() {
    return {
      date: "",
      currentMonthName: "",
      currentMonthLength: "",
      currentYear: "",
      lastMonthLength: "",
      dateNow: "",
      dateInCalendar: "",
      indexOfFirstDay: "",
      indexOfLastDay: "",
      lastDay: "",
      daysFromNextMonth: "",
      checkInDay: "",
      checkOutDay: "",
    };
  },
  props: {
    bookedDays: {
      type: Array,
      required: false,
      default: () => [],
    },
    daysOfWeek: {
      type: Array,
      default: () => [],
    },
    months: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.date = new Date();
    this.dateNow = Date.now();
    this.prepareDate();
  },
  methods: {
    availabilityChecker(event, i) {
      event.dataset.available !== "date-not-available"
        ? this.bookingHandler(event, i)
        : "";
    },
    bookingHandler(event, i) {
      if (this.checkInDay === "") {
        const oldCheckInDate = document.querySelector(".check-in-booked");

        if (oldCheckInDate) {
          oldCheckInDate.classList.remove("check-in-booked");
        }

        this.checkInDay = `${this.currentYear}-${
          this.date.getMonth() + 1
        }-${i}`;
        this.$store.commit("updateCheckInDay", this.checkInDay);
        event.classList.add("check-in-booked");
      } else if (this.checkOutDay === "") {
        const oldCheckOutDate = document.querySelector(".check-out-booked");

        if (oldCheckOutDate) {
          oldCheckOutDate.classList.remove("check-out-booked");
        }

        this.checkOutDay = `${this.currentYear}-${
          this.date.getMonth() + 1
        }-${i}`;
        this.$store.commit("updateCheckOutDay", this.checkOutDay);
        event.classList.add("check-out-booked");

        this.compareChosenDates();
      } else if (this.checkOutDay && this.checkInDay) {
        this.checkInDay = "";
        this.checkOutDay = "";

        const checkInDate = document.querySelector(".check-in-booked");
        const checkOutDate = document.querySelector(".check-out-booked");

        if (checkInDate) {
          checkInDate.classList.remove("check-in-booked");
        }

        if (checkOutDate) {
          checkOutDate.classList.remove("check-out-booked");
        }

        this.checkInDay = `${this.currentYear}-${
          this.date.getMonth() + 1
        }-${i}`;
        event.classList.add("check-in-booked");

        this.$store.commit("updateCheckInDay", this.checkInDay);
        this.$store.commit("updateCheckOutDay", "");
      }
    },
    changeMonth(num) {
      const currentMonth = this.date.getMonth();
      const currentYear = this.date.getFullYear();
      let newDate;

      if (this.changeMonth === 0) {
        newDate = new Date(currentYear - 1, 11, 1);
      } else if (this.currentMonth === 11) {
        newDate = new Date(currentYear + 1, 0, 1);
      } else {
        newDate = new Date(currentYear, currentMonth + num, 1);
      }

      this.date = newDate;
      this.prepareDate();
    },
    compareChosenDates() {
      // If the check-out date is earlier than check-in, replace each other
      const checkInTimestamp = this.convertToTimestamp(this.checkInDay);
      const checkOutTimestamp = this.convertToTimestamp(this.checkOutDay);

      if (checkOutTimestamp < checkInTimestamp) {
        const oldCheckInDay = this.checkInDay;
        const oldCheckOutDay = this.checkOutDay;

        this.checkInDay = oldCheckOutDay;
        this.checkOutDay = oldCheckInDay;

        this.$store.commit("updateCheckInDay", this.checkInDay);
        this.$store.commit("updateCheckOutDay", this.checkOutDay);
      }
    },
    convertToTimestamp(date) {
      date = date.split("-");
      return new Date(date[0], date[1] - 1, date[2]).getTime();
    },
    isShouldDisabled(num) {
      const fullDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        num
      );

      const formatedDate = fullDate.toISOString().slice(0, 10);
      const isBooked = this.bookedDays.find(
        (bookedDay) => bookedDay.date === formatedDate
      );

      if (this.dateNow > fullDate.getTime()) {
        return "date-not-available";
      } else if (isBooked) {
        return "date-not-available";
      } else {
        return "date-is-available";
      }
    },
    prepareDate() {
      this.currentYear = this.date.getFullYear();
      this.currentMonthName = this.months[this.date.getMonth()];
      this.currentMonthLength = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      this.indexOfFirstDay =
        new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() + 1;
      this.indexOfLastDay =
        new Date(
          this.date.getFullYear(),
          this.date.getMonth() + 1,
          0
        ).getDay() + 1;
      this.lastMonthLength = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        0
      ).getDate();
      this.daysFromLastMonth = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        0
      ).getDate();
      this.daysFromNextMonth = 7 - this.indexOfLastDay;
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-card {
  position: absolute;
  margin-top: 5px;
  width: 100%;
  top: 50px;
  background-color: $white;
  box-shadow: $box-shadow-basic;

  &__heading {
    background-color: $green;
    padding: $small-padding $tiny-padding;
    text-align: center;
    outline: none;
    display: flex;
    justify-content: space-between;

    button {
      @include button-reset();
      color: $white;
    }

    h3 {
      color: $white;
      font-weight: $weight-text-700;
    }
  }

  &__body {
    @include flex-column-100();
    padding: $tiny-padding;
  }

  &__table {
    @include flex-column-100();
  }

  &__day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    & > span {
      height: 42px;
      line-height: 42px;
      text-align: center;
      padding: 0;
      border-spacing: 0;
      color: lighten($color-text-primary, 10);
    }
  }

  &__dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__single-date {
    height: 42px;
    width: 42px;
    line-height: 42px;
    color: $color-text-primary;
    text-align: center;
    padding: 0;
    border-spacing: 0;
    outline: 0;
    border-radius: 50%;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &.booked {
      background-color: $green !important;
      color: $white !important;
    }

    &:hover {
      background-color: $green;
      color: $white;
      cursor: pointer;
    }

    &[data-available="date-not-available"],
    &[data-available="date-not-available"]:hover,
    &[data-available="date-not-available"]:focus,
    &--disabled,
    &--disabled:hover,
    &--disabled:focus,
    &--empty,
    &--empty:hover,
    &--empty:focus {
      background: 0;
      cursor: default;
    }

    &[data-available="date-not-available"],
    &[data-available="date-not-available"]:hover,
    &[data-available="date-not-available"]:focus,
    &--disabled,
    &--disabled:hover,
    &--disabled:focus {
      color: $color-blocked;
    }

    &--empty {
      background: 0;
      cursor: default;
    }

    &.check-in-booked,
    &.check-out-booked {
      background-color: $green;
      color: $white;
    }
  }
}
</style>
