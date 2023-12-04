document.addEventListener('DOMContentLoaded', function () {
    const boat = document.querySelector('.boat');
    const bobber = document.getElementById('bobber');
    const rodString = document.querySelector('.string');

    let isCasting = false;

    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            if (!isCasting) {
                isCasting = true;
                castBobber();
            } else {
                isCasting = false;
                retractBobber();
            }
        }
    });

    function setFishingRodPosition() {
        const rod = document.getElementById('fishing-rod');
        const rodRect = rod.getBoundingClientRect();
        bobber.style.left = rodRect.left + rodRect.width / 2 + 'px';
        bobber.style.top = rodRect.bottom + 'px';
    }

    function castBobber() {
        setFishingRodPosition();

        bobber.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease-in-out';
        rodString.style.transition = 'height 0.8s ease-in-out';

        bobber.style.opacity = '1';
        bobber.style.transform = 'translate(-50%, -50%) translateY(65px)'; // Adjusted position
        rodString.style.height = '100px';
    }

    function retractBobber() {
        setFishingRodPosition();

        bobber.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        rodString.style.transition = 'height 1s ease-in-out';

        bobber.style.opacity = '0';
        bobber.style.transform = 'translate(-50%, -50%) translateY(0)';
        rodString.style.height = '0';
    }

    // Call setFishingRodPosition to set the initial position when the page loads
    setFishingRodPosition();
});
