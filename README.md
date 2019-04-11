# Magnifyingglass.js

## Introduction
This is a simple JavaScript magnifying glass widget for web pages.

## Usage
`<script src="http://jedi-knight.github.io/magnifyingglass.js/MagnifyingGlass.js-1.0a/MagnifyingGlass.js-1.0a.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    new MagnifyingGlass.MagnifyingGlass({
        target: this.getElementById("magnifying-glass-target"),  // magnification target's #id
        opaque: true,    // wether the empty areas of the glass remain transparent (doesn't magnify the background)
        power: 9,	// magnification power
        glass_diameter: 600	// diameter of the glass in pixels
    }).magnification.start();	// starts magnification (and .maginifaction.stop() function stops it, see example 1 below)
});
</script>`

## Configuration parameters
1. Toggle button to start and stop
(http://jedi-knight.github.io/magnifyingglass.js/examples/default_autoinit.html)[http://jedi-knight.github.io/magnifyingglass.js/examples/default_autoinit.html]

2. Magnification-factor, Glass-size and Opaque-background
(http://jedi-knight.github.io/magnifyingglass.js/examples/magnification_factor_and_glass_size_and_opaque_background.html)[http://jedi-knight.github.io/magnifyingglass.js/examples/magnification_factor_and_glass_size_and_opaque_background.html]

3. On a Leaflet map
(http://jedi-knight.github.io/magnifyingglass.js/examples/leaflet_map.html)[http://jedi-knight.github.io/magnifyingglass.js/examples/leaflet_map.html]
