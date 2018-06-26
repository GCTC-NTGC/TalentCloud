
var MobileMenu = {};

MobileMenu.debug = true;

if (!window.console) {
    var console = {};
}

if (!console.log) {
    console.log = function () {};
}

// Window Event Listener =======================================================

MobileMenu.addWindowEventListener = function (event, myFunction) {

    if (window.addEventListener) {

        window.addEventListener(event, myFunction, false);

    } else if (window.attachEvent) {

        var onEvent = "on" + event;

        window.attachEvent(onEvent, myFunction);

    }

};

// Window Size Check for TabIndex ==============================================

MobileMenu.checkWindowSize = function() {

    var x = window.matchMedia("screen and (min-width: 1024px)");

    if (x.matches) {

        var mainMenu = document.getElementById("pageHeroNavigationMenu");

        var menuItems = mainMenu.querySelectorAll(".page-hero__navigation-item a");

        for (var i = 0; i < menuItems.length; i++) {

            menuItems[i].setAttribute("tabindex", "0");

        }

    }

}

MobileMenu.addWindowEventListener("load", MobileMenu.checkWindowSize);

// Mobile Navigation Triggers ==================================================

MobileMenu.mobileNavClickListener = function (e) {

    var mobileMenuTrigger = document.getElementById("pageHeroMobileTrigger");

    var mainMenu = document.getElementById("pageHeroNavigationMenu");

    var menuItems = mainMenu.querySelectorAll(".page-hero__navigation-item a");

    e.preventDefault();

    if (this.classList.contains("active")) {

        this.classList.remove("active");

        mainMenu.classList.remove("active");

        for (var i = 0; i < menuItems.length; i++) {

            menuItems[i].setAttribute("tabindex", "-1");

        }

        document.body.style.overflowY = "visible";

    } else {

        this.classList.add("active");

        mainMenu.classList.add("active");

        for (var i = 0; i < menuItems.length; i++) {

            menuItems[i].setAttribute("tabindex", "0");

        }

        document.body.style.overflowY = "hidden";

    }

};

MobileMenu.mobileNavKeyListener = function (e) {

    if (e.keyCode == 13) {

        this.click();

    }

};

MobileMenu.setMobileNavTriggers = function () {

    // Gets all elements on the page with "accordion-trigger".
    var mobileMenuTrigger = document.getElementById("pageHeroMobileTrigger");

    // Checks for a click.
    mobileMenuTrigger.addEventListener("click", MobileMenu.mobileNavClickListener);

    // Checks for an Enter key click.
    mobileMenuTrigger.addEventListener("keydown", MobileMenu.mobileNavKeyListener);

};

MobileMenu.addWindowEventListener("load", MobileMenu.setMobileNavTriggers);

// Mobile Navigation Tab Order =================================================

MobileMenu.mobileNavTabListener = function (e) {

    // Get the Main Menu
    var mainMenu = document.getElementById("pageHeroNavigationMenu");

    // Get Mobile Menu Trigger
    var menuTrigger = document.querySelector(".page-hero__mobile-trigger");

    // Get Mobile Menu Items
    var menuItems = mainMenu.querySelectorAll(".page-hero__navigation-item:not(.hidden) a");

    // Get Last Menu Item
    var lastMenuItem = menuItems[menuItems.length - 1]

    if (e.keyCode == 9) {

        if (this === lastMenuItem) {

            e.preventDefault();

            menuTrigger.focus();

            return false;

        }

    }

}

MobileMenu.setMobileNavTabTriggers = function (e) {

    var x = window.matchMedia("screen and (max-width: 1023px)");

    if (x.matches) {

        // Get the Main Menu
        var mainMenu = document.getElementById("pageHeroNavigationMenu");

        // Get Mobile Menu Items
        var menuItems = mainMenu.querySelectorAll(".page-hero__navigation-item a");

        // Set Triggers
        for (var i = 0; i < menuItems.length; i++) {

            menuItems[i].addEventListener("keydown", MobileMenu.mobileNavTabListener);

        }

    }

}

MobileMenu.addWindowEventListener("load", MobileMenu.setMobileNavTabTriggers);