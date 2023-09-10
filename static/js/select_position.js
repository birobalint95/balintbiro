function selectPosition(clicked_id) {
    var clickedElement = document.getElementById(clicked_id);
    var isElementSelected = clickedElement.classList.contains("selected");
    var allRightboxItems = document.getElementsByClassName("rb-item");

    if (! isElementSelected) {
        [].forEach.call(allRightboxItems, function(actualRightboxItem) {
            actualRightboxItem.classList.remove("selected");
        });
    clickedElement.parentElement.classList.add("selected");
    };

    var roleContent = document.querySelector("[title=" + CSS.escape(clicked_id) + "]");
    var isRoleContentDisplayed = roleContent.classList.contains("displayed");
    var allRoleContentItems = document.getElementsByClassName("role-description");

    if (! isRoleContentDisplayed) {
        [].forEach.call(allRoleContentItems, function(actualRoleContentItem){
            actualRoleContentItem.classList.remove("displayed");
        });
    roleContent.classList.add("displayed");
    };
};
