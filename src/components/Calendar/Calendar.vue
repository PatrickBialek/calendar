<template>
  <div class="calendar">
    <div class="calendar__heading">
      <span class="calendar__price">{{ price }} {{ currency }}</span>
      <StarsRating :rating="3.55" />
    </div>
    <div class="calendar__main">
      <span class="calendar__title">{{ translationsVerifed["dates"] }}:</span>
      <div class="calendar__fields-box">
        <div class="calendar__trigger">
          <button @click="isCalendarCardActive = !isCalendarCardActive">
            {{ checkInDate ? checkInDate : translationsVerifed["checkIn"] }}
          </button>
          <i class="fas fa-arrow-right"></i>
          <button @click="isCalendarCardActive = !isCalendarCardActive">
            {{ checkOutDate ? checkOutDate : translationsVerifed["checkOut"] }}
          </button>
        </div>
        <CalendarCard v-show="isCalendarCardActive" />
      </div>
    </div>
  </div>
</template>

<script>
import CalendarCard from "./CalendarCard.vue";
import StarsRating from "@/components/StarsRating/StarsRating.vue";
export default {
  components: { CalendarCard, StarsRating },
  name: "Calendar",
  data() {
    return {
      isCalendarCardActive: false,
      // checkInDate: "",
      // checkOutDate: "",
    };
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    translations: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    translationsVerifed() {
      const defaultTranslations = {
        checkIn: "Check In",
        checkOut: "Check Out",
        dates: "Dates",
      };

      return Object.assign(defaultTranslations, this.translations);
    },
    checkInDate() {
      return this.$store.getters.getCheckInDay;
    },
    checkOutDate() {
      return this.$store.getters.getCheckOutDay;
    },
  },
};
</script>

<style scoped lang="scss">
.calendar {
  border: $border-basic;
  padding: $basic-padding;
  box-sizing: border-box;
  min-width: 400px;

  &__heading {
    padding-bottom: $basic-padding;
    border-bottom: $border-basic;
  }

  &__price {
    font-weight: $weight-text-900;
    font-size: $size-text-heading;
    display: inline-block;
    margin-bottom: $tiny-margin;
  }

  &__main,
  &__trigger {
    display: flex;
    width: 100%;
  }

  &__main {
    flex-direction: column;
    margin-top: $tiny-margin;
  }

  &__title {
    font-weight: $weight-text-500;
    font-size: $size-text-tiny;
    color: $color-text-heading;
    line-height: 1.6;
  }

  &__fields-box {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: $medium-margin;
  }

  &__trigger {
    border: $border-basic;
    display: flex;
    align-items: center;

    button {
      @include button-reset();
      margin: $btn-margin;
      padding: $btn-padding;
      font-weight: $weight-text-300;
      color: $color-text-heading;
      flex-grow: 1;
      outline: none;
      text-align: left;
      border-radius: 3px;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: $aqua;
      }
    }
  }
}
</style>
