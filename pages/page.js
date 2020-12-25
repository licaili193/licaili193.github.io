function loadPage(title, author, info) {
    $("#page").load("page.html", function() {
        $("#title").html(title);
        $("#author").html(author);
        $("#info").html(info);
        
        var index = 0;

        files.forEach(f => {
            $("#main-container").append( 
                "<div class='grid-item'>\
                    <img class='preview-image' src='"+ folder + f +"' index='" + index + "'>\
                </div>"
            );
            index++;
        });
        
        var colc = new Colcade( '.grid', {
            columns: '.grid-col',
            items: '.grid-item'
        });
        
        $(".grid-item img").click(function(){
            $("#full-image").attr("src", folder + files[$(this).attr("index")]);
            $("#full-image").attr("index", $(this).attr("index"));
            $('#image-viewer').show();
        });
        
        $("#image-viewer #close").click(function(){
            $('#image-viewer').hide();
        });
        
        $("#image-viewer #left").click(function(){
            var index = $("#full-image").attr("index");
            index--;
            if (index < 0) {
                index = files.length - 1;
            }
            $("#full-image").attr("src", folder + files[index]);
            $("#full-image").attr("index", index);
        });
        
        $("#image-viewer #right").click(function(){
            var index = $("#full-image").attr("index");
            index++;
            if (index >= files.length) {
                index = 0;
            }
            $("#full-image").attr("src", folder + files[index]);
            $("#full-image").attr("index", index);
        });
    });
}
