function MagnifyingGlass(content) {
    var glass = document.createElement("div");
    glass.setAttribute("class", "glass");
    var style = "width:200px;" +
            "height:200px;" +
            "border:#cccccc solid thick;" +
            "overflow:hidden;" +
            "border-radius:100px;" +
            "box-shadow:0px 0px 6px 2px #000000;" +
            "position:absolute;";
    glass.setAttribute("style", style);
    content = content.cloneNode(true);
    var zoomStyle = "-webkit-transform-origin: -150px -150px;" +
            "-webkit-transform:scale(2,2);position:absolute;";

    this.defaultStyle = function() {
        return style;
    };
    var contentStyle = content.getAttribute("style");
    contentStyle = contentStyle ? contentStyle : "";
    content.setAttribute("style", contentStyle + zoomStyle);

    this.defaultContentStyle = function() {
        return contentStyle + zoomStyle;
    };
    glass.appendChild(content);
    this.getElement = function() {
        return glass;
    };
    this.getContent = function(){
        return content;
    };
}

document.addEventListener("DOMContentLoaded", function() {

    var target = document.getElementById("container");
    var magnifyingGlass = new MagnifyingGlass(target);
    target.appendChild(magnifyingGlass.getElement());

    target.addEventListener("mousemove", function(e) {
        var x = (Number(e.clientX));
        var y = (Number(e.clientY));
        var x1 = (Number(e.layerX));
        var y1 = (Number(e.layerY));
        magnifyingGlass.getElement().setAttribute("style", magnifyingGlass.defaultStyle() + "left:" + (x - 100) + "px;top:" + (y - 100) + "px;");
        var content = magnifyingGlass.getContent();
        content.setAttribute("style", magnifyingGlass.defaultContentStyle() + "left:" + (-2*x-25) + "px;top:" + (-2*y-25) + "px;");

        document.getElementsByClassName("coords")[0].innerHTML = x + ", " + y;
        document.getElementsByClassName("coordsOne")[0].innerHTML = x1 + ", " + y1;
        document.getElementsByClassName("coords")[1].innerHTML = x + ", " + y;
        document.getElementsByClassName("coordsOne")[1].innerHTML = x1 + ", " + y1;
    });
}, false);

