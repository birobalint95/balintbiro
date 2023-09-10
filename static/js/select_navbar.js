$(document).ready (function() {
    const current_url = document.URL;
    console.log(current_url);
    const pieces_of_url = current_url.split(/[\s/]+/)
    const last_piece_of_url = pieces_of_url[pieces_of_url.length - 1]

    if(last_piece_of_url==""){
        console.log("about");
    } else {
        console.log(last_piece_of_url);
    }
});
