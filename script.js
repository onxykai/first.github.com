document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const celebration = document.getElementById('celebration');
    const confettiCanvas = document.getElementById('confetti');

    function isToday(dateString) {
        const today = new Date();
        const inputDate = new Date(dateString);
        return today.getDate() === inputDate.getDate() &&
               today.getMonth() === inputDate.getMonth();
    }

    function showCelebration() {
        celebration.classList.remove('hidden');
        form.classList.add('hidden');
        startConfetti();
        // Resize confetti to viewport
        resizeConfetti();
        window.addEventListener('resize', resizeConfetti);
    }

form.addEventListener('submit', function(e) {
    e.preventDefault();
    showCelebration();
});

    // Confetti Animation
    let confettiActive = false;
    function startConfetti() {
        confettiActive = true;
        const ctx = confettiCanvas.getContext('2d');
        let W = window.innerWidth, H = window.innerHeight;
        confettiCanvas.width = W;
        confettiCanvas.height = H;

        const confettiColors = ['#ff6f61', '#ffa07a', '#ffd6c0', '#fcb69f', '#ffecd2', '#fbeee6', '#c5e1a5'];
        const particles = [];
        for (let i = 0; i < 160; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H - H,
                r: Math.random() * 8 + 4,
                d: Math.random() * 60 + 40,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.1 + 0.05,
                tiltAngle: 0
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r/3, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d/3);
                ctx.stroke();
            }
            update();
        }

        function update() {
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.y += Math.cos(0.01 + p.d) + 2 + p.r/2;
                p.x += Math.sin(0.01 + p.d);

                p.tiltAngle += p.tiltAngleIncremental;
                p.tilt = Math.sin(p.tiltAngle - (i % 3)) * 15;

                // Recycle confetti if out of bounds
                if (p.y > H) {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d,
                        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                        tilt: Math.random() * 10 - 5,
                        tiltAngleIncremental: p.tiltAngleIncremental,
                        tiltAngle: 0
                    };
                }
            }
        }

        function loop() {
            if (confettiActive) {
                draw();
                requestAnimationFrame(loop);
            }
        }
        loop();
    }

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
});
