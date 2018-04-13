var imgs = $(".image-gallery > img");
var currentImage = null;
//imgs.css({
//    "max-height":"50%",
//    "border":"2px solid lightskyblue",
//    "padding":"5px"
//});

$(".button.close").click(hideLightBox);

function showLightBox() {
    $(".lightbox").removeClass("hidden");
    $(".lightbox-image").attr("src", this.getAttribute("data-large"));
    currentImage = $(this);
}

function hideLightBox() {
    $(".lightbox").addClass("hidden");
    currentImage = null;
    
}
imgs.click(showLightBox);

function swichImage (direction) {
    
    var  nextImage;
    
    if(direction == "right") {
        nextImage = currentImage.next();
       
    }
    
    if(direction == "left") {
        nextImage = currentImage.prev();
        
    }
    
    if (nextImage.length == 0) {
        if(direction == "right") {
            nextImage = imgs.first();
        }
        if(direction == "left") {
            nextImage = imgs.last();
        }
    }
    
    $(".lightbox-image").attr("src", nextImage.attr("data-large"));
    currentImage = nextImage;
}

$(".right.button").click(function() {
    swichImage("right");
})

$(".left.button").click(function() {
    swichImage("left");
})

function resize() {
    $(".lightbox-image").css({
        "max-height" : window.innerHeight + "px",
        "max-width" : window.innerWidth + "px"
    })
    
}

resize();

window.addEventListener("resize", resize);

function getPics(page) {
$.ajax({
    url:"http://gp3st0.tmweb.ru/api/?a=list&page=" +page,
    success: function(data) {
//        console.log(data);
        var images = JSON.parse(data);
        var container = $(".image-gallery");
        container.empty();
        for(var i = 0; i < images.images.length; i++) {
            var img = $("<img>");
            img.attr("src", images.images[i].small);
            img.attr("data-large", images.images[i].full);
            container.append(img);
            
        }
        imgs = $(".image-gallery > img");
        imgs.click(showLightBox);
    }
})
}
getPics(0);

$(".pagination li").click(function(){
    getPics(this.getAttribute('data-page'));
});