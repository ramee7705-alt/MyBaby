document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const envelopeSeal = document.getElementById('envelope-seal');
    const mainEnvelope = document.getElementById('main-envelope');
    const letterPanel = document.getElementById('letter-panel');
    const letterCard = document.querySelector('.letter-card');
    const openSecondEnvelopeBtn = document.getElementById('open-second-envelope-btn');
    const secondFlow = document.getElementById('second-flow');
    const secondEnvelope = document.getElementById('second-envelope');
    const kissBtn = document.getElementById('kiss-btn');
    const envelopeText = document.querySelector('.envelope-text');

    // --- ENVELOPE FLOW LOGIC ---
    function revealLetter() {
        mainEnvelope.classList.add('open', 'hidden');
        if (envelopeText) {
            envelopeText.classList.add('hidden');
        }
        letterPanel.classList.remove('hidden');
        if (letterCard) {
            letterCard.classList.remove('bloom');
            void letterCard.offsetWidth; // Trigger reflow for animation restart
            letterCard.classList.add('bloom');
        }
    }

    function revealSecondEnvelope() {
        secondFlow.classList.remove('hidden');
        letterPanel.classList.add('hidden');
        setTimeout(() => {
            secondEnvelope.classList.add('open');
        }, 100);
    }

    function finishEnvelopeSequence() {
        const notebook = document.querySelector('.notebook-container');
        loader.classList.add('fade-out');
        if (notebook) {
            notebook.classList.remove('hidden');
        }
        setTimeout(() => {
            loader.style.display = 'none';
        }, 420);
    }

    // Envelope Listeners
    envelopeSeal.addEventListener('click', revealLetter);
    envelopeSeal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            revealLetter();
        }
    });
    openSecondEnvelopeBtn.addEventListener('click', revealSecondEnvelope);
    kissBtn.addEventListener('click', finishEnvelopeSequence);

    // --- NOTEBOOK CONTROLLER ---
    const notebookContainer = document.querySelector('.notebook-container');
    const spreads = document.querySelectorAll('.book-spread');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('page-indicator');
    
    let currentSpread = 0;
    const totalSpreads = spreads.length;

    function updateNotebook() {
        spreads.forEach((spread, index) => {
            if (index < currentSpread) {
                spread.classList.add('flipped');
                spread.classList.remove('active');
            } else if (index === currentSpread) {
                spread.classList.remove('flipped');
                spread.classList.add('active');
            } else {
                spread.classList.remove('flipped');
                spread.classList.remove('active');
            }
        });

        // Dynamic page indicator update
        if (pageIndicator) {
            pageIndicator.textContent = `${currentSpread + 1} / ${totalSpreads}`;
        }

        // Toggle state styles on navigational arrows
        prevBtn.classList.toggle('disabled', currentSpread === 0);
        nextBtn.classList.toggle('disabled', currentSpread === totalSpreads - 1);

        // Transform end arrow into a heart on the last page
        if (currentSpread === totalSpreads - 1) {
            nextBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        }
    }

    // Navigation Triggers
    function nextPage() {
        if (currentSpread < totalSpreads - 1) {
            currentSpread++;
            updateNotebook();
            spawnBurst(5);
        }
    }

    // Navigation Triggers
    function prevPage() {
        if (currentSpread > 0) {
            currentSpread--;
            updateNotebook();
            spawnBurst(5);
        }
    }

    // Button Click Listeners
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);

    // --- SWIPE GESTURES FOR MOBILE ---
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    if (notebookContainer) {
        notebookContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        notebookContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const xDiff = touchStartX - touchEndX;
        const yDiff = touchStartY - touchEndY;
        
        // Ensure it's a distinct horizontal swipe, not a vertical scroll on Page 5
        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 40) {
            if (xDiff > 0) {
                // Swiped Left -> Go to Next Page
                nextPage();
            } else {
                // Swiped Right -> Go to Previous Page
                prevPage();
            }
        }
    }

    // Run layout setup on initiation
    updateNotebook();

    // --- FLOATING HEARTS GENERATOR ---
    const heartsContainer = document.querySelector('.floating-hearts');

    function createHeart(leftPercent) {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤';
        const size = Math.floor(Math.random() * 24) + 18; // 18-42px
        
        heart.style.left = (typeof leftPercent === 'number' ? leftPercent : Math.random() * 100) + '%';
        heart.style.fontSize = size + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.opacity = (Math.random() * 0.25 + 0.85).toString();
        
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // Gentle ambient background hearts
    setInterval(() => createHeart(), 900);

    // Burst generator for active page turns
    function spawnBurst(count = 6) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => createHeart(Math.random() * 100), i * 80);
        }
    }

    // Celebratory initial burst on load
    spawnBurst(8);
});
            currentSpread--;
            updateNotebook();
        }
    });

    // Run structural visual layout setup mapping rules
    updateNotebook();

    // --- Floating Hearts Generator ---
    const heartsContainer = document.querySelector('.floating-hearts');

    function createHeart(leftPercent) {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤';
        const size = Math.floor(Math.random() * 24) + 18; // 18-42px
        heart.style.left = (typeof leftPercent === 'number' ? leftPercent : Math.random() * 100) + '%';
        heart.style.fontSize = size + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.opacity = (Math.random() * 0.25 + 0.85).toString();
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // gentle ongoing hearts
    const heartInterval = setInterval(() => createHeart(), 900);

    function spawnBurst(count = 6) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => createHeart(Math.random() * 100), i * 80);
        }
    }

    // spawn small burst whenever pages change
    const origUpdateNotebook = updateNotebook;
    // wrap updateNotebook to add burst
    function updateNotebookWithHearts() {
        origUpdateNotebook();
        spawnBurst(5);
    }

    // Replace usages: update listeners to call our wrapped function
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    // Re-query after replacement
    const newPrev = document.getElementById('prevBtn');
    const newNext = document.getElementById('nextBtn');

    newNext.addEventListener('click', () => {
        if (currentSpread < totalSpreads - 1) {
            currentSpread++;
            updateNotebookWithHearts();
        }
    });

    newPrev.addEventListener('click', () => {
        if (currentSpread > 0) {
            currentSpread--;
            updateNotebookWithHearts();
        }
    });

    // initial celebratory burst on load
    spawnBurst(8);
});
