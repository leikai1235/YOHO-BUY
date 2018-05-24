require.config({
    baseUrl: "../lib",
    paths: {
        "jquery": "jquery",
        "lazyload": "lazyload",
        "gpBanner": "jquery.banner",
        "swiper": "swiper",
        "Magnifier": "magnifier",
        "pagination": "jquery.pagination",
        "common":"common",
        "index":"index",
        "product":"product",
        "detail":"detail",
        "login":"login",
        "reginster":"reginster",
        "cart":"cart"
    },
    shim: {
        "lazyload": {
            deps: ["jquery"],
            exports: "lazyload"
        },
        "gpBanner": {
            deps: ["jquery"],
            exports: "gpBanner"
        },
        "Magnifier": {
            deps: ["jquery"],
            exports: "Magnifier"
        },
        "pagination": {
            deps: ["jquery"],
            exports: "pagination"
        }
    }
});
