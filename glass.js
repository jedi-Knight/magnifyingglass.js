function MagnifyingGlass(content){
    var glass = document.createElement("div");    
    glass.setAttribute("class", "glass");
    var style = "width:200px;"+
        "height:200px;"+
        "border:#cccccc solid thick;"+
        "overflow:hidden;"+
        "border-radius:100px;"+
        "box-shadow:0px 0px 6px 2px #000000;"+
        "position:absolute;";
    glass.setAttribute("style",style);
    content = content.cloneNode(true);
    var zoomStyle = "-webkit-transform-origin: -150px -150px;"+
        "-webkit-transform:scale(2,2);";
    
    this.defaultStyle = function(){
        return style;
    }
    var contentStyle = content.getAttribute("style");
    contentStyle = contentStyle? contentStyle: "";
    content.setAttribute("style",contentStyle+zoomStyle);
    
    this.defaultContentStyle = function(){
        return contentStyle+zoomStyle;
    }
    glass.appendChild(content);
    this.getElement = function(){    
        return glass;
    }
}

document.addEventListener("DOMContentLoaded", function(){

var target = document.getElementById("container");
var magnifyingGlass = new MagnifyingGlass(target.getElementsByClassName("zoomee")[0]);
target.appendChild(magnifyingGlass.getElement());
//var contentStyle = target.getElementsByClassName("zoomee")[0].getAttribute("style");

target.addEventListener("mousemove", function(e){
    var x = (Number(e.clientX));
    var y = (Number(e.clientY));
    var x1 = (Number(e.layerX));
    var y1 = (Number(e.layerY));
    magnifyingGlass.getElement().setAttribute("style", magnifyingGlass.defaultStyle()+"left:"+(x-100)+"px;top:"+(y-100)+"px;"); 
    var content = magnifyingGlass.getElement().getElementsByClassName("zoomee")[0];
    content.setAttribute("style",magnifyingGlass.defaultContentStyle()+"margin-left:"+(-2*x)+"px;margin-top:"+(-2*y)+"px;");
    
    document.getElementById("coords").innerHTML= x+", "+y;
    document.getElementById("coordsOne").innerHTML= x1+", "+y1;
});
}, false);

