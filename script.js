document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Background Video Ping-Pong Looping
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        let isReversing = false;
        let reverseInterval;

        bgVideo.addEventListener('timeupdate', () => {
            // When reaching the end (or very close), start manual reverse playback
            if (!isReversing && bgVideo.duration && bgVideo.currentTime >= bgVideo.duration - 0.1) {
                isReversing = true;
                bgVideo.pause();
                
                // Manually scrub backwards (works on all browsers even if playbackRate=-1 doesn't)
                reverseInterval = setInterval(() => {
                    if (bgVideo.currentTime <= 0.1) {
                        clearInterval(reverseInterval);
                        isReversing = false;
                        bgVideo.play();
                    } else {
                        bgVideo.currentTime -= 0.05; // step back ~50ms
                    }
                }, 50); // every 50ms
            }
        });
    }
});
