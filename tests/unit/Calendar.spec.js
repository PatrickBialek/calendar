import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Calendar from "@/components/Calendar/Calendar.vue";
import CalendarCard from "@/components/Calendar/CalendarCard.vue";
import StarsRating from "@/components/StarsRating/StarsRating.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    checkInDay: "2021-5-10",
    checkOutDay: "2021-5-15",
  },
});

describe("Calendar", () => {
  const wrapper = shallowMount(Calendar, {
    components: { CalendarCard, StarsRating },
    propsData: {
      currency: "zł",
      price: 298,
    },
    store,
    localVue,
  });

  test("props testing", () => {
    expect(wrapper.props("currency")).toBe("zł");
    expect(wrapper.props("price")).toBe(298);
  });

  test("content testing", () => {
    const checkInBtn = wrapper.find("button[data-button='check-in']");
    const checkOutBtn = wrapper.find("button[data-button='check-out']");

    expect(checkInBtn.text()).toBe("Check In");
    expect(checkOutBtn.text()).toBe("Check Out");
  });

  test("snapshop a component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
