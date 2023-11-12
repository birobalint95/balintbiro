function selectPosition() {
    var isElementSelected = this.classList.contains("selected");
    var allRightboxItems = document.getElementsByClassName("experience-item");

    if (! isElementSelected) {
        [].forEach.call(allRightboxItems, function(actualRightboxItem) {
            actualRightboxItem.classList.remove("selected");
        });
    this.parentElement.classList.add("selected");
    };

    var roleContent = document.querySelector("[title=" + CSS.escape(this.id) + "]");
    var isRoleContentDisplayed = roleContent.classList.contains("displayed");
    var allRoleContentItems = document.getElementsByClassName("experience-content");

    if (! isRoleContentDisplayed) {
        [].forEach.call(allRoleContentItems, function(actualRoleContentItem){
            actualRoleContentItem.classList.remove("displayed");
        });
    roleContent.classList.add("displayed");
    };

    let responsibilitiesDetail = document.getElementById(CSS.escape(this.id) + "-responsibilities");

    selectRoleDetailTab(responsibilitiesDetail);

};

function selectRoleDetailTab(trigger){
    let selectedRoleDetailTab;
    if (trigger.target) {
        selectedRoleDetailTab = this;
    } else {
        selectedRoleDetailTab = trigger;
    }
    var allRoleDetailSelectorItems = document.getElementsByClassName("detail-category");
    [].forEach.call(allRoleDetailSelectorItems, function(actualRoleDetailSelectorItem) {
        var actualRoleDetailContentItem = document.querySelector("[title=" + CSS.escape(actualRoleDetailSelectorItem.id) + "]");
        if(actualRoleDetailSelectorItem.id == selectedRoleDetailTab.id){
            actualRoleDetailSelectorItem.classList.add("selected");
            actualRoleDetailContentItem.classList.add("displayed");
        } else {
            actualRoleDetailSelectorItem.classList.remove("selected");
            actualRoleDetailContentItem.classList.remove("displayed");
        }
    });
};