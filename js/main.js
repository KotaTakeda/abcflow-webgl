var abc = null;
var controls = null;

window.addEventListener('load', function() {
    var canvas = document.querySelector('#abc');
    abc = ABC.run(canvas);
    controls = new Controls(abc);

    window.addEventListener('keypress', function(e) {
        if (e.which === '?'.charCodeAt(0)) {
            var h = document.querySelector('#help');
            h.style.display = h.style.display == 'none' ? 'block' : 'none';
            var hsmall = document.querySelector('#help-small');
            hsmall.style.display = hsmall.style.display == 'none' ? 'block' : 'none';
        }
    });
    // window.addEventListener('touchstart', function self(e) {
    //     var h = document.querySelector('#help');
    //     h.style.display = 'none';
    // });

    var stats = document.querySelector('#stats');
    function update_stats() {
        var fps = abc.fps;
        var count = abc.solutions.length.toLocaleString();
        stats.textContent = count + ' @ ' + fps + ' FPS';
    }
    window.setInterval(update_stats, 1000);
    controls.listeners.push(update_stats);

    var preset = document.querySelector('#preset');
    preset.addEventListener('change', function() {
        if (preset.value === 'chaos1') {
            controls.clear();
            controls.add();
            for (var i = 0; i < 31; i++)
                controls.clone();
        } else if (preset.value === 'chaos2') {
            controls.clear();
            controls.add();
            controls.clone_circle();
            abc.display.draw_heads = true;
        // } else if (preset.value === 'gentle') {
        //     while (abc.solutions.length < 32)
        //         controls.add();
        //     abc.display.rotationd[0] = 0;
        //     abc.display.rotationd[1] = 0;
        //     abc.display.rotationd[2] = 0.007;
        //     abc.display.damping = false;
        // } else if (preset.value === 'bendy') {
        //     while (abc.solutions.length < 32)
        //         controls.add();
        //     controls.set_A(17.24);
        //     controls.set_B(1.1);
        //     controls.set_rho(217);
        //     // abc.display.scale = 1 / 65;
        } else if (preset.value === 'inits') {
            controls.set_A(1);
            controls.set_B(1);
            controls.set_C(1);
            controls.set_k(1);
        } else if (preset.value === 'param1') {
            controls.set_A(1);
            controls.set_B(Math.sqrt(2/3));
            controls.set_C(Math.sqrt(1/3));
            controls.set_k(1);
        } else if (preset.value === 'param2') {
            controls.set_A(1);
            controls.set_B(0.5);
            controls.set_C(0.3);
            controls.set_k(1);
        }
    });
});
