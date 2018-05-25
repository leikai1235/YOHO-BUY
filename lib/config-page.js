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
        "show":"show",
        "login":"login",
        "reginster":"reginster",
        "cart":"cart",
        "getData":"getData",
        "getCartLocal":"getCartLocal"
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
