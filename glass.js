function PluginError(params) {
    var e = function() {
        this.name = params.name;
        this.message = params.message;
        this.params = params.params;
    };
    e.prototype = new Error();
    e.prototype.constructor = e;
    return e;
}

function MagnifyingGlass(options) {
    var content = document.getElementById("magnify-enabled");
    var glass_diameter = 200;
    var power = 2;
    var magnifyButton = false;
    var target, targetRect;

    if (options) {
        content = options.target ? options.target : content;
        glass_diameter = options.glass_diameter ? options.glass_diameter : glass_diameter;
        power = options.power ? options.power : power;
        magnifyButton = options.toggle_button ? options.toggle_button : false;
    }

    if (!content)
        throw new PluginError({
            name: "Constructor Error",
            message: "Magnification Target not found. See plugin documentation for more info on this.",
            params: options
        });

    target = content;
    targetRect = target.getBoundingClientRect();
    content = content.cloneNode(true);
    content.id = "zoomed";

    var contentWidth = targetRect.width;
    var contentHeight = targetRect.height;
    var contentX = 0;
    var contentY = 0;
    contentX = targetRect.left;
    contentY = targetRect.top;
    if (content.style.position === "absolute") {
        contentX = targetRect.left;
        contentY = targetRect.top;
    }



    var glass = document.createElement("div");
    glass.setAttribute("id", "glass");
    var style = "width:" + glass_diameter + "px;" +
            "height:" + glass_diameter + "px;" +
            "border:#cccccc solid thick;" +
            "overflow:hidden;" +
            "border-radius:" + (glass_diameter / 2) + "px;" +
            "box-shadow:0px 0px 6px 2px #000000;" +
            "position:absolute;";
    glass.setAttribute("style", style);


    var zoomStyle = "-webkit-transform-origin:-" + contentWidth / 2 + "px -" + contentHeight / 2 + "px;" +
            "-webkit-transform:scale(" + power + "," + power + ");position:absolute;";


    var contentStyle = content.getAttribute("style");
    contentStyle = contentStyle ? contentStyle : "";
    content.setAttribute("style", contentStyle + zoomStyle);

    this.defaultStyle = function() {
        return style;
    };
    var defaultContentStyle = function() {
        return contentStyle + zoomStyle;
    };
    this.getElement = function() {
        return glass;
    };
    this.getContent = function() {
        return content;
    };

    function init(toggle) {
        if (!toggle) {
            target.onmouseover = null;
            return;
        }
        target.onmouseover = function() {
            target.appendChild(glass);
        };


        target.addEventListener("mousemove", function(e) {




            var x = (Number(e.clientX));
            var y = (Number(e.clientY));

            if (x > targetRect.right | x < targetRect.left)
                glass.remove();
            if (y > targetRect.bottom | x < targetRect.top)
                glass.remove();



            var glassX = x - contentX - glass_diameter / 2;
            var glassY = y - contentY - glass_diameter / 2;



            glass.setAttribute("style", style + "left:" + (glassX) + "px;top:" + (glassY) + "px;");
           content.setAttribute("style", defaultContentStyle() + "left:" + (-power * x /*+ glass_diameter -contentWidth/2*/) + "px;top:" + (-power * y /*+ glass_diameter -contentHeight/2*/) + "px;");

        });
    }

    if (magnifyButton) {
        var toggleState = 0;
        magnifyButton.addEventListener("click", function() {
            toggleState += 1;
            toggleState %= 2;
            if (toggleState) {
                init(true);
            } else {
                init(false);
            }
        });
        target.appendChild(magnifyButton);
    }

    this.magnification = {
        start: function() {
            init(true);
        },
        stop: function() {
            init(false);
        }
    };

    glass.appendChild(content);



}


document.addEventListener("DOMContentLoaded", function() {
    var magnifyToggleButton = document.getElementById("magnifying-glass-button");
    if (magnifyToggleButton)
        new MagnifyingGlass({
            target: document.getElementById("magnifying-glass-target"),
            toggle_button: magnifyToggleButton
        });
    else
        new MagnifyingGlass({
            target: document.getElementById("magnifying-glass-target")
        }).magnification.start();
});

