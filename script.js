// =========================
// Main JavaScript
// =========================

document.addEventListener("DOMContentLoaded", () => {
	// Initialise carousel if present
	initCarousel();
});

// =========================
// Carousel
// =========================

function initCarousel() {
	const carousel = document.querySelector(".carousel");

	// Exit if this page has no carousel
	if (!carousel) return;

	const slides = carousel.querySelectorAll(".carousel-slide");
	const prevBtn = carousel.querySelector(".prev");
	const nextBtn = carousel.querySelector(".next");
	const dotsContainer = carousel.querySelector(".carousel-dots");

	if (!slides.length) return;

	let currentSlide = 0;
	let autoPlay;

	const slideInterval = 5000; // 5 seconds

	// Create navigation dots
	slides.forEach((slide, index) => {
		const dot = document.createElement("button");

		dot.classList.add("carousel-dot");
		dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

		dot.addEventListener("click", () => {
			showSlide(index);
			resetAutoPlay();
		});

		dotsContainer.appendChild(dot);
	});

	const dots = dotsContainer.querySelectorAll(".carousel-dot");

	// Display selected slide
	function showSlide(index) {
		currentSlide = (index + slides.length) % slides.length;

		slides.forEach((slide, i) => {
			const isActive = i === currentSlide;

			slide.classList.toggle("active", isActive);
			slide.setAttribute("aria-hidden", String(!isActive));
		});

		dots.forEach((dot, i) => {
			const isActive = i === currentSlide;

			dot.classList.toggle("active", isActive);
			dot.setAttribute("aria-pressed", String(isActive));
		});
	}

	// Next slide
	function nextSlide() {
		showSlide(currentSlide + 1);
	}

	// Previous slide
	function prevSlide() {
		showSlide(currentSlide - 1);
	}

	// Start automatic sliding
	function startAutoPlay() {
		if (
			slides.length < 2 ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			return;
		}

		autoPlay = setInterval(nextSlide, slideInterval);
	}

	// Reset timer after manual interaction
	function resetAutoPlay() {
		clearInterval(autoPlay);
		startAutoPlay();
	}

	// Button events
	nextBtn.addEventListener("click", () => {
		nextSlide();
		resetAutoPlay();
	});

	prevBtn.addEventListener("click", () => {
		prevSlide();
		resetAutoPlay();
	});

	// Pause when mouse is over carousel
	carousel.addEventListener("mouseenter", () => {
		clearInterval(autoPlay);
	});

	carousel.addEventListener("mouseleave", () => {
		resetAutoPlay();
	});

	// Pause when keyboard focus is inside carousel
	carousel.addEventListener("focusin", () => {
		clearInterval(autoPlay);
	});

	carousel.addEventListener("focusout", (event) => {
		if (!carousel.contains(event.relatedTarget)) {
			resetAutoPlay();
		}
	});

	// Pause when browser tab is hidden
	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			clearInterval(autoPlay);
		} else {
			resetAutoPlay();
		}
	});

	// Initialise
	showSlide(0);
	startAutoPlay();
}
