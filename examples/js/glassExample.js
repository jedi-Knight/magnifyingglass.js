document.addEventListener("DOMContentLoaded", function() {
    new MagnifyingGlass.MagnifyingGlass({
        target: this.getElementById("magnifying-glass-target"),
        opaque: true,
        power: 3,
        glass_diameter: 300
    }).magnification.start();
});