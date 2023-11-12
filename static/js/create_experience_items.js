export {createExperienceItems};

function createExperienceItems(rolesJsonData){ 

    let indexOfRole = 1;
    for(let role of rolesJsonData){

        let classOfListItemOfExperience = "experience-item";
        let classOfExperienceContentDiv = "experience-content";
        if (indexOfRole == 1) {
            classOfListItemOfExperience += " selected"
            classOfExperienceContentDiv += " displayed"
        }

        // *** TIMELINE SECTION ***

        // LIST ITEM ELEMENT
        const listItemOfExperience = document.createElement("li");
        listItemOfExperience.setAttribute("class", `${classOfListItemOfExperience}`);
        listItemOfExperience.setAttribute("ng-repeat", "itembx");

        // ANCHOR OF LIST ITEM
        const anchorOfListItem = document.createElement("a");
        let idOfAnchor = `${role.area}-${role.title}`.toLowerCase().replace(/ & /g, "-and-").replace(/ /g, "-");
        anchorOfListItem.setAttribute("id", `${idOfAnchor}`);
        anchorOfListItem.setAttribute("href", "javascript:void(0)");
        anchorOfListItem.addEventListener("click", selectPosition);

        // TITLE OF ROLE
        const titleOfRole = document.createElement("div");
        titleOfRole.setAttribute("class", "item-title");
        titleOfRole.insertAdjacentHTML("beforeend", `${role.title}`)
        anchorOfListItem.appendChild(titleOfRole);

        // TIMESTAMP OF ROLE
        const timestampOfRole = document.createElement("div");
        timestampOfRole.setAttribute("class", "timestamp");
        timestampOfRole.insertAdjacentHTML("beforeend", `${role.company}<br>${role.area}`)
        anchorOfListItem.appendChild(timestampOfRole);

        // ADD ANCHOR TO LIST ITEM
        listItemOfExperience.appendChild(anchorOfListItem);

        // ADD EXPERIENCE LIST ITEM TO ITS SECTION
        const experienceSection = document.getElementById("experiences-list");
        experienceSection.appendChild(listItemOfExperience);

        // *** CONTENT SECTION ***

        // EXPERIENCE CONTENT DIV ELEMENT
        const experienceContentDiv = document.createElement("div");
        experienceContentDiv.setAttribute("title", `${idOfAnchor}`);
        experienceContentDiv.setAttribute("class", `${classOfExperienceContentDiv}`);

        // TITLE SECTION OF EXPERIENCE CONTENT
        const titleSectionOfExperienceContent = document.createElement("div");
        titleSectionOfExperienceContent.setAttribute("class", "experience-title-section");

        // TITLE
        const experienceTitle = document.createElement("h2");
        experienceTitle.setAttribute("class", "experience-title");
        const textOfExperienceTitle = document.createTextNode(`${role.title}`);
        experienceTitle.appendChild(textOfExperienceTitle);

        // DATE
        const dateOfExperience = document.createElement("span");
        dateOfExperience.setAttribute("class", "experience-date");
        const textOfDate = document.createTextNode(`${role.time}`);
        dateOfExperience.appendChild(textOfDate);
        experienceTitle.appendChild(dateOfExperience);

        // ADD EXPERIENCE TITLE TO TITLE SECTION 
        titleSectionOfExperienceContent.appendChild(experienceTitle);

        // LOCATION
        const experienceLocation = document.createElement("h4");
        experienceLocation.setAttribute("class", "experience-location");
        const textOfExperienceLocation = document.createTextNode(`${role.company}, ${role.area}`);
        experienceLocation.appendChild(textOfExperienceLocation);

        // ADD LOCATION TO TITLE SECTION 
        titleSectionOfExperienceContent.appendChild(experienceLocation);

        // ADD TITLE SECTION TO EXPERIENCE CONTENT
        experienceContentDiv.appendChild(titleSectionOfExperienceContent);

        // CONTENT OF CONTENT SECTION
        const contentSectionOfExperienceContent = document.createElement("div");
        contentSectionOfExperienceContent.setAttribute("class", "content-section");

        // GROUP OF DETAILS
        const groupOfDetails = document.createElement("group");
        groupOfDetails.setAttribute("id", "group-of-details");

        let indexOfDetail = 1;
        const divsOfDescriptions = [];
        ['Responsibilities','Skills','Tools'].forEach(function(detail) {
            let classOfDetail = "detail-category";
            let classOfDescription = "tab-content";
            if (indexOfDetail == 1) {
                classOfDetail += " selected"
                classOfDescription += " displayed"
            }

            // ANCHOR OF GROUP
            const anchorOfDetail = document.createElement("a");
            anchorOfDetail.setAttribute("id", `${idOfAnchor}-${detail}`.toLowerCase());
            anchorOfDetail.setAttribute("class", `${classOfDetail}`);
            anchorOfDetail.setAttribute("href", "javascript:void(0)");
            anchorOfDetail.addEventListener("click", selectRoleDetailTab);
            anchorOfDetail.innerHTML = `${detail}`;
            groupOfDetails.appendChild(anchorOfDetail);

            // DESCRIPTION OF DETAIL
            const divOfDescriptionOfDetail = document.createElement("div");
            divOfDescriptionOfDetail.setAttribute("id", `tab-content-${idOfAnchor}-${detail}`.toLowerCase());
            divOfDescriptionOfDetail.setAttribute("title", `${idOfAnchor}-${detail}`.toLowerCase());
            divOfDescriptionOfDetail.setAttribute("class", `${classOfDescription}`);

            let detailElementWithContent = createHtmlContentForRoleDetail(detail, role, divOfDescriptionOfDetail);
            divsOfDescriptions.push(detailElementWithContent);

            indexOfDetail++;
        });

        contentSectionOfExperienceContent.appendChild(groupOfDetails);
        for(let divOfDescription of divsOfDescriptions){
            contentSectionOfExperienceContent.appendChild(divOfDescription);
        }

        // ADD CONTENT SECTION TO EXPERIENCE CONTENT
        experienceContentDiv.appendChild(contentSectionOfExperienceContent);

        // ADD EXPERIENCE CONTENT TO ITS SECTION
        const experienceContentSection = document.getElementById("content-of-experiences");
        experienceContentSection.appendChild(experienceContentDiv);

        indexOfRole++;

    }
};

function createHtmlContentForRoleDetail(detailCategory, role, detailElement){
    if (detailCategory == "Responsibilities"){
        const descriptionOfResponsibilities = document.createElement("div");
        fetch(`${role.description_html}`).then(function (response) {
            if (response.ok) {
                return response.text();
            }
            throw response;
        }).then(function (htmlOfDescription) {
            descriptionOfResponsibilities.insertAdjacentHTML("beforeend", `${htmlOfDescription}`);
        });
        detailElement.appendChild(descriptionOfResponsibilities);
    } else if (detailCategory == "Skills"){
        detailElement = createHtmlContentForRoleSkills(role.skills, detailElement);
    } else if (detailCategory == "Tools"){
        detailElement = createHtmlContentForRoleTools(role.skills["Tools and software"], detailElement);
    }
    return detailElement;
}

function createHtmlContentForRoleSkills(skills, detailElement){
    Object.entries(skills).forEach(([skill_area, area_skills]) => {
        if (area_skills.length > 0){
            const skillArea = document.createElement("p");
            skillArea.insertAdjacentHTML("beforeend", `${skill_area}`);
            skillArea.setAttribute("class", "role-skill-area");
            detailElement.appendChild(skillArea);
            let sectionOfSkills = createHtmlContentForRoleSection(area_skills);
            detailElement.appendChild(sectionOfSkills);
        }
    });
    return detailElement;
}

function createHtmlContentForRoleTools(tools, detailElement){
    const sectionOfTools = document.createElement("section");
    sectionOfTools.setAttribute("class", "role-skill-cards");
    for (let tool of tools){
        let imageLocation = "./static/images/tool_images/" + `${tool}`.toLowerCase().replace(/ /g, "_") + ".png";
        let roleToolCard = createGenericCardWithImage(tool, imageLocation);
        sectionOfTools.appendChild(roleToolCard);
    }
    detailElement.appendChild(sectionOfTools);
    return detailElement;
}


function createHtmlContentForRoleSection(area_skills){
    const sectionOfSkills = document.createElement("section");
    sectionOfSkills.setAttribute("class", "role-skill-cards");
    for(let area_skill of area_skills){
        let roleSkillCard = createGenericCardWithoutImage(area_skill, true);
        sectionOfSkills.appendChild(roleSkillCard);
    }
    return sectionOfSkills
}
