var previousPage = -1;
var currentPage = -1;

var cardIndex = 0;

function isAtPage(page) {
    const delta = document.body.scrollHeight / 3;
    return page * delta <= document.body.scrollTop && (page + 1 ) * delta > document.body.scrollTop;
}

function loadPage(page) {
    if (page == 0) {

    } else if (page == 1) {
        var effects = "animate__animated animate__fadeInDown";

        $("#model-buttons").css("visibility", "visible");
        $("#model-buttons").addClass(effects);
        $("#model-buttons").on('animationend', () => {
            $("#model-buttons").removeClass(effects);
        });
    } else if (page == 2) {

    }
}

function leavePage(page) {
    if (page == 0) {

    } else if (page == 1) {
        $("#model-buttons").css("visibility", "hidden");
    } else if (page == 2) {

    }
}

class SlideCard {
    constructor(parent) {
        this.namespace = "slidecard__";
        this.parent = parent;
        this.current = -1;
        this.fadeInEffects = "animate__fadeInLeft";
        this.fadeOutEffects = "animate__fadeOutRight";
        this.showTable = [false, false, false, false];

        var i = 0;
        for (i of [1, 2, 3, 4]) {
            var card = "<div class='card animate__animated' id='" + this.getCardName(i) + "'>\
                       <button><img src='resources/icons/button.png'></button>\
                       <img src='resources/images/dummy_page_3.png'></div>";
            $("#" + parent).append(card);
            $("#" + this.getCardName(i)).css("visibility", "hidden");
        }

        $(".card").click(function(event) {
            event.stopPropagation();
        });
    }

    getCardName(num) {
        return this.namespace + "card-" + String(num);
    }

    show(num) {
        if ([1, 2, 3, 4].includes(num)) {
            $("#" + this.getCardName(num)).off("animationend");
            $("#" + this.getCardName(num)).removeClass(this.fadeOutEffects);
            $("#" + this.getCardName(num)).addClass(this.fadeInEffects);
            $("#" + this.getCardName(num)).css("visibility", "visible");
            this.showTable[num - 1] = true;
            this.current = num;
        }
    }

    hide(num) {
        if ([1, 2, 3, 4].includes(num)) {
            $("#" + this.getCardName(num)).removeClass(this.fadeInEffects);
            $("#" + this.getCardName(num)).addClass(this.fadeOutEffects);
            $("#" + this.getCardName(num)).on("animationend", () => {
                $("#" + this.getCardName(num)).css("visibility", "hidden");
            });
            this.showTable[num - 1] = false;
            this.current = -1;
        }
    }

    hideAll() {
        var i = 0;
        for (i of [1, 2, 3, 4]) {
            if (this.showTable[i - 1]) {
                this.hide(i);
            }
        }
    }

    hideAllBut(num) {
        var i = 0;
        for (i of [1, 2, 3, 4]) {
            if (this.showTable[i - 1] && i != num) {
                this.hide(i);
            }
        }
    }
}

$(document).ready(function() {
    let cards = new SlideCard("section-2");

    $(".model-button").hover(function() {
        if ($(this).is(":hover")) {
            for (i of [1, 2, 3, 4]) {
                if ($(this).attr('id') == ("model-" + String(i))) {
                    cards.hideAllBut(i);
                    cards.show(i);
                    break;
                }
            }
        }
    });

    $(".model-container").click(function(event) {
        event.stopPropagation();
    });

    $("#section-2").click(function() {
        cards.hideAll();
    });

    $(document.body).scroll(function() {
        for (i of [0, 1, 2]) {
            if (isAtPage(i)) {
                currentPage = i;
                break;
            }
        }

        if (currentPage != previousPage) {
            for (i of [0, 1, 2]) {
                if (previousPage ==i) {
                    leavePage(i);
                    break;
                }
            }
            for (i of [0, 1, 2]) {
                if (currentPage ==i) {
                    loadPage(i);
                    break;
                }
            }
            previousPage = currentPage;
        }
    });
});