import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Calendar from "@/components/Calendar/Calendar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    checkInDay: "2021-5-10",
    checkOutDay: "2021-5-15",
  },
});

describe("Calendar", () => {
  it("renders a checkout and checking using a real Vuex store", () => {
    const wrapper = shallowMount(Calendar, {
      propsData: {
        currency: "zł",
        price: 298,
      },
      store,
      localVue,
    });

    expect(wrapper.props("currency")).toBe("zł");
    expect(wrapper.props("price")).toBe(298);

    const checkInBtn = wrapper.find("button[data-button='check-in']");
    const checkOutBtn = wrapper.find("button[data-button='check-out']");

    expect(checkInBtn.text()).toBe("Check In");
    expect(checkOutBtn.text()).toBe("Check Out");
  });
});

describe("methods", () => {
  test();
});
