<template>
  <div class="stars-rating">
    <div class="stars-rating__stars">
      <div class="stars-outer">
        <div
          :style="{ width: this.starsHandler + '%' }"
          class="stars-inner"
        ></div>
      </div>
    </div>
    <span class="stars-rating__rating">{{ rating }}</span>
  </div>
</template>

<script>
export default {
  name: "StarsRating",
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    starsHandler() {
      return (this.rating * 100) / 5;
    },
  },
};
</script>

<style scoped lang="scss">
.stars-rating {
  display: flex;
  align-items: center;

  &__stars {
    margin-right: 0.5rem;

    .stars-outer {
      position: relative;
      display: inline-block;
      margin-bottom: 4px;

      &::before {
        content: "\f005 \f005 \f005 \f005 \f005";
        font-size: $size-text-stars;
        font-family: "Font Awesome 5 Free";
        font-weight: $weight-text-900;
        color: $silver;
      }
    }

    .stars-inner {
      position: absolute;
      white-space: nowrap;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 0;

      &::before {
        content: "\f005 \f005 \f005 \f005 \f005";
        font-size: $size-text-stars;
        font-family: "Font Awesome 5 Free";
        font-weight: $weight-text-900;
        color: $ming;
      }
    }
  }

  &__rating {
    color: $color-text-heading;
    font-size: $size-text-tiny;
    font-weight: $weight-text-700;
  }
}
</style>
