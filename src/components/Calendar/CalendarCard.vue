<template>
  <div class="calendar-card">
    <div class="calendar-card__content">
      <div class="calendar-card__heading">
        <button>
          <i class="fas fa-arrow-left"></i>
        </button>
        <h3 class="heading-primary">
        </h3>
        <button>
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
      daysOfWeek: [
        { name: "Sun" },
        { name: "Mon" },
        { name: "Tue" },
        { name: "Wed" },
        { name: "Thu" },
        { name: "Fri" },
        { name: "Sat" },
      ],
      indexOfFirstDay: "",
      indexOfLastDay: "",
      lastDay: "",
      daysFromNextMonth: "",
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
      ]
    };
  },
  created() {
    this.date = new Date();
    this.dateNow = Date.now();
    this.prepareDate();
  },
  methods: {
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
