document.addEventListener("DOMContentLoaded", function() {
    new MagnifyingGlass.MagnifyingGlass({
        target: this.getElementById("magnifying-glass-target"),
        opaque: true,
        power: 9,
        glass_diameter: 600
    }).magnification.start();
});