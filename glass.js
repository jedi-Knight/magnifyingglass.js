function UI_Button(initObj) {
    var button = $("<a></a>");
    if (initObj) {
        $(button).attr(function() {
            var attrObj = {};
            for (var attr in initObj.attributes) {
                attrObj[attr] = initObj.attributes[attr];
            }
            return attrObj;
        }());
        for (var event in initObj.eventHandlers) {
            $(button).on(event, initObj.eventHandlers[event]);
        }
        $(typeof initObj.content === "function" ? initObj.content.call() : initObj.content).appendTo(button);
    }

    return button;
}

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
        magnifyButton = options.magnify_button? true: false;
    }

    if(!content) throw new PluginError({
       name:"Constructor Error",
       message:"Magnification Target not found. See plugin documentation for more info on this.",
       params: options
    });
    
    target = content;
    targetRect = target.getBoundingClientRect();
    content = content.cloneNode(true);
    content.id="zoomed";

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
    
    function init(){
        target.onmouseover=function(){
            target.appendChild(glass);
        };
        
        
        target.addEventListener("mousemove", function(e){
            
            
           
           
           var x = (Number(e.clientX));
           var y = (Number(e.clientY));
           
           if(x>targetRect.right | x<targetRect.left) glass.remove();
           if(y>targetRect.bottom | x<targetRect.top) glass.remove();
           
       
           
           var glassX = x - contentX -glass_diameter/2;
           var glassY = y - contentY - glass_diameter/2;
           
            
            
           glass.setAttribute("style", style + "left:" + (glassX) + "px;top:" + (glassY) + "px;");
           content.setAttribute("style", defaultContentStyle() + "left:" + (-power * x + glass_diameter -contentWidth/2) + "px;top:" + (-power * y + glass_diameter -contentHeight/2) + "px;");
           
            });
    }
    
    if(magnifyButton){
        magnifyButton = new UI_Button({
            attributes:{
                class:"magnifying-glass-trigger"
            },
            eventHandlers:{
                click: init
            }
        });
        content.appendChild(magnifyButton);
    }
    
    this.magnify = function(){
        init();
    };

    glass.appendChild(content);
    
    
    
}

/*document.addEventListener("DOMContentLoaded", function() {

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
        content.setAttribute("style", magnifyingGlass.defaultContentStyle() + "left:" + (-2 * x + 100) + "px;top:" + (-2 * y + 100) + "px;");

        document.getElementsByClassName("coords")[0].innerHTML = x + ", " + y;
        document.getElementsByClassName("coordsOne")[0].innerHTML = x1 + ", " + y1;
        document.getElementsByClassName("coords")[1].innerHTML = x + ", " + y;
        document.getElementsByClassName("coordsOne")[1].innerHTML = x1 + ", " + y1;
    });
}, false);*/

document.addEventListener("DOMContentLoaded", function() {
    new MagnifyingGlass({
        target: document.getElementById("container")
    }).magnify();
    
    
});

