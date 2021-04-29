import { shallowMount } from "@vue/test-utils";
import StarsRating from "@/components/StarsRating/StarsRating.vue";

describe("StarsRating", () => {
  const wrapper = shallowMount(StarsRating, {
    propsData: {
      rating: 3.55,
    },
  });

  test("props testing", () => {
    expect(wrapper.props("rating")).toBe(3.55);
  });

  test("stars calculations", () => {
    expect(StarsRating.computed.starsHandler.call({ rating: 3.55 })).toBe(71);
  });

  test("snapshop a component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
