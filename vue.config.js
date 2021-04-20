module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
					@import "@/assets/styles/_reset.scss";
					@import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
          @import "@/assets/styles/_typography.scss";
				`,
      },
    },
  },
};
