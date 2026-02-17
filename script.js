(function () {
    'use strict';

    const CLOSE_DELAY_MS = 2500;
    let audioCtx = null;

    function playBaaSound() {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(262, audioCtx.currentTime);
            osc.frequency.setValueAtTime(523, audioCtx.currentTime + 0.08);
            osc.frequency.setValueAtTime(784, audioCtx.currentTime + 0.16);
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) {}
    }

    function onSpotTap(spot) {
        if (spot.classList.contains('open')) return;
        spot.classList.add('open');
        playBaaSound();
        setTimeout(function () {
            spot.classList.remove('open');
        }, CLOSE_DELAY_MS);
    }

    var spots = document.querySelectorAll('.spot');
    spots.forEach(function (spot) {
        spot.addEventListener('touchstart', function (e) {
            e.preventDefault();
            onSpotTap(spot);
        }, { passive: false });
        spot.addEventListener('click', function (e) {
            e.preventDefault();
            onSpotTap(spot);
        });
    });
})();
