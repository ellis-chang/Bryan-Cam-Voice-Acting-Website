// fetching specific elements from html document
const demo1 = document.getElementById("animation_audio");
const demo2 = document.getElementById("commercial_audio");
const play1 = document.getElementById("play_animation");
const play2 = document.getElementById("play_commercial");
const animationDuration = document.getElementById("animation_duration");
const commercialDuration = document.getElementById("commercial_duration");
const animationAudioPlayer = document.querySelector(".animation_audio_player");
const commercialAudioPlayer = document.querySelector(".commercial_audio_player");
const animationTimeline = animationAudioPlayer.querySelector(".animation_duration_bar");
const commercialTimeline = commercialAudioPlayer.querySelector(".commercial_duration_bar");
const hamburger = document.querySelector(".hamburger");
const menuIcon = document.getElementById("menu_icon");
const navMenu = document.querySelector(".nav_menu");
const nav = document.getElementById("navigation");
const overlay = document.querySelector(".fog_of_war");
const header = document.getElementsByTagName("header");

// global vars
var currentAudio;
var toggled = false;
var headerToggled = false;

// function that plays the animation demo
const playAnimation = () => {
    currentAudio = demo1;
    toggleIcon(true);
    toggleAudio();
};

// function that plays the commercial demo
const playCommercial = () => {
    currentAudio = demo2;
    toggleIcon(true);
    toggleAudio();
};

// function that plays and pauses the audio when toggled
const toggleAudio = () => {
    if(!currentAudio.paused) {
        currentAudio.pause();
        toggleIcon(false);
    } else {
        currentAudio.play();
    }
};

// function that changes the play/pause icon when toggled
const toggleIcon = play => {
    if (currentAudio === demo1) {
        icon = play1;
    } else if (currentAudio === demo2) {
        icon = play2;
    }
    
    if(play) {
        icon.innerHTML = "pause";
    } else {
        icon.innerHTML = "play_arrow";
    }
};

// event listener of the custom animation demo duration/progress bar
animationTimeline.addEventListener("mousedown", function init(e) {
    updateAnimationBar(e);
    animationTimeline.addEventListener("mousemove", updateAnimationBar, false);
    animationTimeline.addEventListener("mouseup", stopUpdateAnimation, false);
}, false);

// updates the animation duration bar to the current audio time clicked/selected
const updateAnimationBar = e => {
    const animationTimelineWidth = window.getComputedStyle(animationTimeline).width;
    const animationTimeToSeek = e.offsetX / parseInt(animationTimelineWidth) * demo1.duration;
    demo1.currentTime = animationTimeToSeek;
};

// stops the animation duration bar from updating
const stopUpdateAnimation = () => {
    animationTimeline.removeEventListener("mousemove", updateAnimationBar);
    animationTimeline.removeEventListener("mouseup", stopUpdateAnimation);
};

// event listener of the custom commercial demo duration/progress bar
commercialTimeline.addEventListener("mousedown", e => {
    updateCommercialBar(e);
    commercialTimeline.addEventListener("mousemove", updateCommercialBar, false);
    commercialTimeline.addEventListener("mouseup", stopUpdateCommercial, false);
}, false);

// updates the commercial duration bar to the current audio time clicked/selected
const updateCommercialBar = e => {
    const commercialTimelineWidth = window.getComputedStyle(commercialTimeline).width;
    const commercialTimeToSeek = e.offsetX / parseInt(commercialTimelineWidth) * demo2.duration;
    demo2.currentTime = commercialTimeToSeek;
};

// stops the commercial duration bar from updating
const stopUpdateCommercial = () => {
    commercialTimeline.removeEventListener("mousemove", updateCommercialBar);
    commercialTimeline.removeEventListener("mouseup", stopUpdateCommercial);
};

// updates the duration/progress bar by changing the width based off the current audio time
setInterval(() => {
    const animationProgressBar = animationAudioPlayer.querySelector("#animation_duration");
    animationProgressBar.style.width = demo1.currentTime / demo1.duration * 100 + "%";
    const commercialProgressBar = commercialAudioPlayer.querySelector("#commercial_duration");
    commercialProgressBar.style.width = demo2.currentTime / demo2.duration * 100 + "%";
});

// toggle the hamburger menu for smaller screen sizes
const toggleMenu = () => {
    if(!toggled) {
        menuIcon.innerHTML = "close";
        navMenu.className += " responsive";
        nav.className = "responsive";
        overlay.style.display = "block";
        toggled = true;
    } else {
        menuIcon.innerHTML = "menu";
        navMenu.className = "nav_menu";
        nav.classList.remove("responsive");
        overlay.style.display = "none";
        toggled = false;
    }
};

// if hamburger menu is open when on larger display close hamburger and reset nav bar
const updateMenu = () => {
    if(window.innerWidth >= 992) {
        overlay.removeEventListener("click", toggleMenu);
        nav.removeEventListener("click", toggleMenu);
        header[0].removeEventListener("click", toggleOverlay);
        if(toggled) {
            navMenu.display = "block";
            hamburger.display = "none";
            menuIcon.innerHTML = "menu";
            navMenu.className = "nav_menu";
            nav.classList.remove("responsive");
            overlay.style.display = "none";
            toggled = false;
        }
    } else if(window.innerWidth < 992) {
        overlay.addEventListener("click", toggleMenu);
        nav.addEventListener("click", toggleMenu);
        header[0].addEventListener("click", toggleOverlay);
    }
}

window.addEventListener("resize", updateMenu);

// if click on fog of war or header when hamburger menu is open close hamburger menu
const toggleOverlay = () => {
    if(!headerToggled) {
        headerToggled = true;
    } else {
        headerToggled = false;
    }

    if(toggled && !headerToggled) {
        toggleMenu();
    }
}

// load function
window.onload = updateMenu;

// adds scrolling animation to have sections appear on the website