$(document).ready (function() {
    const currentUrl = document.URL;
    const piecesOfUrl = currentUrl.split(/[\s/]+/)
    const lastPieceOfUrl = piecesOfUrl[piecesOfUrl.length - 1]
    if(lastPieceOfUrl==""){
        var navItemId = "about";
    } else {
        var navItemId = lastPieceOfUrl;
    }
    var navItemToSelect = document.getElementById(navItemId);
    var isNavItemSelected = navItemToSelect.classList.contains("selected");
    var allNavElements = document.getElementsByClassName("nav-item");
    if (! isNavItemSelected) {
        [].forEach.call(allNavElements, function(actualNavElement) {
            actualNavElement.classList.remove("selected");
        });
    }
    navItemToSelect.classList.add("selected");
});
