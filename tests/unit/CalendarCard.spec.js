import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import CalendarCard from "@/components/Calendar/CalendarCard.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    checkInDay: "2021-5-10",
    checkOutDay: "2021-5-15",
  },
});

describe("CalendarCard", () => {
  const wrapper = shallowMount(CalendarCard, {
    propsData: {
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
    },
    store,
    localVue,
  });

  const months = [
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
  ];

  const { convertToTimestamp } = CalendarCard.methods;

  test("content testing", () => {
    const currentMonth = months[new Date().getMonth()];
    const heading = wrapper.find(".heading-primary");

    expect(heading.text()).toBe(`${currentMonth} 2021`);
    expect(wrapper.vm.currentYear).toBe(2021);
  });

  test("snapshop a component", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("convert to timestamp function", () => {
    expect(convertToTimestamp("2021-4-30")).toBe(1619733600000);
  })  
});
