files.forEach(f => {
    $("#main-container").append( 
        "<div class='grid-item'>\
            <img class='preview-image' src='"+ folder + f +"'>\
        </div>"
    );
});

var colc = new Colcade( '.grid', {
columns: '.grid-col',
items: '.grid-item'
});

$(".grid-item img").click(function(){
    $("#full-image").attr("src", $(this).attr("src"));
    $('#image-viewer').show();
    });

    $("#image-viewer .close").click(function(){
    $('#image-viewer').hide();
});