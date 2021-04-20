<template>
  <div class="calendar">
    <div class="calendar__heading">
      <span class="calendar__price">{{ price }} {{ currency }}</span>
			<StarsRating :rating="3.55" />
    </div>
    <div class="calendar__main">
      <span class="calendar__title">{{ translationsVerifed["dates"] }}:</span>
      <div class="calendar__fields-box">
        <div class="calendar__trigger"></div>
      </div>
    </div>
  </div>
</template>

<script>
import StarsRating from "@/components/StarsRating/StarsRating.vue";

export default {
	components: { StarsRating },
  name: "Calendar",
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
    }
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
  }
}
</style>
