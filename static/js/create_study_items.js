export {createStudyItems};

function createStudyItems(introJsonData){ 

    let jsonDataOfStudies = introJsonData["studies"];

    let indexOfRole = 1;
    for(let study of jsonDataOfStudies){

        let classOfListItemOfStudy = "study-item";
        let classOfStudyContentDiv = "study-content";
        if (indexOfRole == 1) {
            classOfListItemOfStudy += " selected"
            classOfStudyContentDiv += " displayed"
        }

        // *** TIMELINE SECTION ***

        // LIST ITEM ELEMENT
        const listItemOfStudy = document.createElement("li");
        listItemOfStudy.setAttribute("class", `${classOfListItemOfStudy}`);
        listItemOfStudy.setAttribute("ng-repeat", "itembx");

        // ANCHOR OF LIST ITEM
        const anchorOfListItem = document.createElement("a");
        let idOfAnchor = `${study.result}`.toLowerCase().replace(/ /g, "-") + "-study";
        anchorOfListItem.setAttribute("id", `${idOfAnchor}`);
        anchorOfListItem.setAttribute("href", "javascript:void(0)");
        anchorOfListItem.addEventListener("click", getStudyDetails);

        // RESULT OF STUDY
        const resultOfStudy = document.createElement("div");
        resultOfStudy.setAttribute("class", "education-result");
        resultOfStudy.insertAdjacentHTML("beforeend", `${study.result}`)
        anchorOfListItem.appendChild(resultOfStudy);

        // LOCATION OF STUDY
        const locationOfStudy = document.createElement("div");
        locationOfStudy.setAttribute("class", "education-location");
        locationOfStudy.insertAdjacentHTML("beforeend", `${study.institution}<br>${study.location}`)
        anchorOfListItem.appendChild(locationOfStudy);

        // ADD ANCHOR TO LIST ITEM
        listItemOfStudy.appendChild(anchorOfListItem);

        // ADD STUDY LIST ITEM TO ITS SECTION
        const studySection = document.getElementById("studies-list");
        studySection.appendChild(listItemOfStudy);

        // *** CONTENT SECTION ***

        // STUDY CONTENT DIV ELEMENT
        const studyContentDiv = document.createElement("div");
        studyContentDiv.setAttribute("title", `${idOfAnchor}`);
        studyContentDiv.setAttribute("class", `${classOfStudyContentDiv}`);

        // TITLE SECTION OF STUDY CONTENT
        const titleSectionOfStudyContent = document.createElement("div");
        titleSectionOfStudyContent.setAttribute("class", "study-title-section");

        // TITLE
        const studyTitle = document.createElement("h2");
        studyTitle.setAttribute("class", "study-title");
        const textOfStudyTitle = document.createTextNode(`${study.result}`);
        studyTitle.appendChild(textOfStudyTitle);

        // DATE
        const dateOfStudy = document.createElement("span");
        dateOfStudy.setAttribute("class", "study-date");
        const textOfDate = document.createTextNode(`${study.time}`);
        dateOfStudy.appendChild(textOfDate);
        studyTitle.appendChild(dateOfStudy);

        // ADD STUDY TITLE TO TITLE SECTION 
        titleSectionOfStudyContent.appendChild(studyTitle);

        // LOCATION
        const studyLocation = document.createElement("h4");
        studyLocation.setAttribute("class", "study-location");
        const textOfStudyLocation = document.createTextNode(`${study.institution}, ${study.location}`);
        studyLocation.appendChild(textOfStudyLocation);

        // ADD LOCATION TO TITLE SECTION 
        titleSectionOfStudyContent.appendChild(studyLocation);

        // ADD TITLE SECTION TO STUDY CONTENT
        studyContentDiv.appendChild(titleSectionOfStudyContent);

        // DESCRIPTION SECTION
        const descriptionSectionOfStudyContent = document.createElement("div");
        descriptionSectionOfStudyContent.setAttribute("class", "study-description-section");

        // DESCRIPTION
        const descriptionOfStudyContent = document.createElement("div");
        descriptionOfStudyContent.setAttribute("id", `study-description-${idOfAnchor}`);
        descriptionOfStudyContent.setAttribute("class", "study-description");
        fetch(`${study.description_html}`).then(function (response) {
            if (response.ok) {
                return response.text();
            }
            throw response;
        }).then(function (htmlOfDescription) {
            descriptionOfStudyContent.insertAdjacentHTML("beforeend", `${htmlOfDescription}`);
        });
        descriptionSectionOfStudyContent.appendChild(descriptionOfStudyContent)

        // ADD DESCRIPTION SECTION TO STUDY CONTENT
        studyContentDiv.appendChild(descriptionSectionOfStudyContent);

        // ADD STUDY CONTENT TO ITS SECTION
        const studyContentSection = document.getElementById("content-of-studies");
        studyContentSection.appendChild(studyContentDiv);

        indexOfRole++;

    }
};
