import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let tl;

function startAnimations() {
    const html = document.documentElement;
    const darkButton = document.querySelector("#toggledark");
    const replayButton = document.querySelector("#replay");

    // Restore dark mode
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark");
    }

    // Dark mode toggle
    darkButton?.addEventListener("click", () => {
        html.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            html.classList.contains("dark") ? "dark" : "light"
        );

        gsap.fromTo(
            darkButton,
            { rotation: 0 },
            { rotation: 360, duration: 0.6, ease: "back.out(1.7)" }
        );
    });

    // Main timeline
    tl = gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: "power1.out"
        }
    });

    tl.from("header h1", {
        y: -50,
        opacity: 0
    })
    .from(".nav-item", {
        y: -30,
        opacity: 0,
        stagger: 0.15
    }, "-=0.3")
    .from("#hero h2", {
        y: 50,
        opacity: 0
    }, "-=0.2")
    .from("#hero p", {
        y: 30,
        opacity: 0
    }, "-=0.3")
    .from("#hero a", {
        y: 20,
        opacity: 0,
        stagger: 0.15
    }, "-=0.3")
    .from("#hero .card-primary", {
        x: 50,
        opacity: 0
    }, "-=0.3");

    // Floating hero card
    gsap.to("#hero .card-primary", {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Scroll reveal with stagger
    gsap.from("main section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: "main",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Scroll progress bar scrub
    gsap.to("#progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });

    // Replay animation
    replayButton?.addEventListener("click", () => {
        tl.restart();
    });

    // Ticker animation
    const elements = document.querySelectorAll(
        "body > header, body > nav, main, main section, footer, button, a.btn-primary"
    );

    gsap.ticker.add(() => {
        elements.forEach((element, index) => {
            gsap.set(element, {
                y: Math.sin(gsap.ticker.time * 2 + index * 0.5) * 5
            });
        });
    });
}

// Start animations after page loads
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAnimations);
} else {
    startAnimations();
}
