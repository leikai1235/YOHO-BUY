require.config({
    baseUrl: "lib",
    paths: {
        "jquery": "jquery",
        "lazyload": "lazyload",
        "gpBanner": "jquery.banner",
        "swiper": "swiper",
        "common":"common",
        "index":"index",
    },
    shim: {
        "lazyload": {
            deps: ["jquery"],
            exports: "lazyload"
        },
        "gpBanner": {
            deps: ["jquery"],
            exports: "gpBanner"
        }
    }
});
