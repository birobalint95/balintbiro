export {createTechnicalSkillCards, createLanguageSkillCards};

function createTechnicalSkillCards(rolesJsonData){
    var dictOfSkills = {};
    var arrayOfSkillAreas = [];
    for(let role of rolesJsonData){
        let roleToDisplay = role.area + " " + role.title;
        Object.entries(role.skills).forEach(([skill_area, area_skills]) => {
            if (!arrayOfSkillAreas.includes(skill_area)){
                arrayOfSkillAreas.push(skill_area)
            }
            for(let area_skill of area_skills){
                if (area_skill in dictOfSkills) {
                    dictOfSkills[area_skill]["roles"].push(roleToDisplay);
                    dictOfSkills[area_skill]["timeIntervals"].push(role.time);
                } else {
                    dictOfSkills[area_skill] = {};
                    dictOfSkills[area_skill]["roles"] = [roleToDisplay];
                    dictOfSkills[area_skill]["timeIntervals"] = [role.time];
                    dictOfSkills[area_skill]["skillArea"] = skill_area;
                }
            }
        });
    }

    for (let skillArea of arrayOfSkillAreas) {
        appendSkillAreaOptionToSelect(skillArea);
        createSkillAreaDiv(skillArea);
    }

    for (const [skill, skillAttributes] of Object.entries(dictOfSkills)) {
        createTechnicalSkillCard(skill, skillAttributes);
    }

};

function appendSkillAreaOptionToSelect(skillArea){
    let skillAreaForTag = `${skillArea}`.toLowerCase().replace(/ /g, "-");
    let skillAreaOption = document.createElement("option");
    skillAreaOption.setAttribute("value", `${skillAreaForTag}-skill-cards-div`);
    skillAreaOption.innerText = `${skillArea}`;
    const skillAreaSelectorOptions = document.getElementById("skill-area-selector-options");
    skillAreaSelectorOptions.appendChild(skillAreaOption);
}

function createSkillAreaDiv(skillArea){

    let skillAreaForTag = `${skillArea}`.toLowerCase().replace(/ /g, "-");

    const skillAreaDiv = document.createElement("div");
    skillAreaDiv.setAttribute("id", `${skillAreaForTag}-skill-cards-div`);
    skillAreaDiv.setAttribute("style", "display: none;"); // languages are the first with block display

    const skillAreaParagraph = document.createElement("p");
    skillAreaParagraph.setAttribute("class", "skill-area-separator");

    const skillAreaSpan = document.createElement("span");
    skillAreaSpan.setAttribute("class", "skill-area-text");
    skillAreaSpan.insertAdjacentHTML("beforeend", `${skillArea}`);
    skillAreaParagraph.appendChild(skillAreaSpan);
    skillAreaDiv.appendChild(skillAreaParagraph);

    const skillAreaSection = document.createElement("section");
    skillAreaSection.setAttribute("id", `${skillAreaForTag}-skill-cards-section`)
    skillAreaSection.setAttribute("class", "skill-cards")
    skillAreaDiv.appendChild(skillAreaSection);

    const skillsSection = document.getElementById("tab-content-skills-about");
    skillsSection.appendChild(skillAreaDiv)
}

function createLanguageSkillCards(introJsonData){
    let jsonDataOfLanguages = introJsonData["languages"];
    for(let language of jsonDataOfLanguages){
        createLanguageSkillCard(language);
    }
}

function createTechnicalSkillCard(skill, skillAttributes) {

    let timeIntervals = skillAttributes["timeIntervals"];
    let roles = skillAttributes["roles"];
    let skillAreaForTag = skillAttributes["skillArea"].toLowerCase().replace(/ /g, "-");;


    // MAIN TITLE
    let mainTitle = `${skill}`;

    // SUBTITLE
    let sumSpentTime = 0;
    for(let timeInterval of timeIntervals){
        sumSpentTime += calculateSpentTime(timeInterval);
    }
    let spentTimeInWords = getWords(sumSpentTime);
    let subTitleEnding;
    if (roles.length > 1){
        subTitleEnding = "roles";
    } else {
        subTitleEnding = "role";
    }
    let subTitle = `${spentTimeInWords}, in <span class="number-of-roles">${roles.length.toString()}</span> ${subTitleEnding}`;

    // DETAILS
    let details = roles;

    // CREATE THE SKILL CARD
    let skillCard = createSkillCard(mainTitle, subTitle, details);

    // ADD EVENTLISTENER TO SKILLCARD
    skillCard.addEventListener("toggle", function() {
        let isDetailsOpen = skillCard.hasAttribute("open");
        let numberOfRoles = skillCard.getElementsByClassName("number-of-roles")[0];
        let numberOfRolesInt = parseInt(numberOfRoles.innerText);
        if (isDetailsOpen) {
            let requiredHeight = 90 + (numberOfRolesInt - 1)*27;
            skillCard.style.height = requiredHeight.toString() + "px";
        } else {
            skillCard.style.height = "70px";
        }
    })

    // ADD SKILLCARD TO ITS SECTION
    const skillCardSection = document.getElementById(`${skillAreaForTag}-skill-cards-section`);
    skillCardSection.appendChild(skillCard);
    
}

function createLanguageSkillCard(language){

    // MAIN TITLE
    let mainTitle = `${language.name} <span class="flag-icon flag-icon-${language.country_code}"></span>`
    // CREATE THE SKILL CARD
    let skillCard = createSkillCard(mainTitle, language.level, language.description);
    // ADD EVENTLISTENER TO SKILLCARD
    skillCard.addEventListener("toggle", function() {
        let isDetailsOpen = skillCard.hasAttribute("open");
        if (isDetailsOpen) {
            skillCard.style.height = "120px";
        } else {
            skillCard.style.height = "70px";
        }
    })

    // ADD SKILLCARD TO ITS SECTION
    const skillCardSection = document.getElementById("language-skill-cards-section");
    skillCardSection.appendChild(skillCard);

}

function createSkillCard(mainTitle, subTitle, details) {
    // DETAILS ELEMENT
    const skillCard = document.createElement("details");
    skillCard.setAttribute("class", "about-skill-details skill-card");
    skillCard.setAttribute("style", "display: flex;");

    // SUMMARY OF DETAILS
    const summaryOfSkillCard = document.createElement("summary");
    summaryOfSkillCard.setAttribute("class", "about-skill-name");

    // SPAN OF SUMMARY
    const spanOfSummary = document.createElement("span");
    spanOfSummary.setAttribute("class", "about-skill-description");
    spanOfSummary.setAttribute("style", "font-weight: bold;");
    spanOfSummary.insertAdjacentHTML("beforeend", mainTitle)
    summaryOfSkillCard.appendChild(spanOfSummary);

    // PARAGRAPH OF SUMMARY
    const paragraphOfSummary = document.createElement("p");
    paragraphOfSummary.setAttribute("class", "about-role-count");
    paragraphOfSummary.setAttribute("style", "font-size: 80%;");
    paragraphOfSummary.insertAdjacentHTML("beforeend", subTitle)
    summaryOfSkillCard.appendChild(paragraphOfSummary);

    // DETAILS
    let detailsOfSkillCard;
    if (Array.isArray(details)){
        detailsOfSkillCard = document.createElement("ul");
        detailsOfSkillCard.setAttribute("class", "skill-description");
        detailsOfSkillCard.setAttribute("style", "padding-left: 90px; font-size: 80%; padding-top: 0px;");
        for(let detail of details){
            const listItem = document.createElement("li");
            listItem.insertAdjacentHTML("beforeend", `${detail}`)
            detailsOfSkillCard.appendChild(listItem);
        }
    } else if (typeof details === 'string') {
        detailsOfSkillCard = document.createElement("p");
        detailsOfSkillCard.setAttribute("class", "skill-description");
        detailsOfSkillCard.setAttribute("style", "padding-left: 60px; font-size: 80%; padding-top: 0px;");
        detailsOfSkillCard.insertAdjacentHTML("beforeend", details);
    } else {
        detailsOfSkillCard = "";
    }

    skillCard.appendChild(summaryOfSkillCard);
    skillCard.appendChild(detailsOfSkillCard);

    return skillCard;

}


function calculateSpentTime(intervalString){
    const partsOfString = intervalString.split(" - ");
  
    let startDate = partsOfString[0];
    let splitStartDate = startDate.split(" ");
    let startYear = splitStartDate[0];
    let startMonth = splitStartDate[1];
  
    let endDate = partsOfString[1];
    let endDateInput;
    if (endDate == "present"){
        let endDateInputBeforeCorrection = new Date();
        endDateInput = new Date(endDateInputBeforeCorrection.setMonth(endDateInputBeforeCorrection.getMonth()+2));
    } else {
        let splitEndDate = endDate.split(" ");
        let endYear = splitEndDate[0];
        let endMonth = splitEndDate[1];
        endDateInput = new Date(endYear, getMonthFromString(endMonth), 1);
    }
    
    let spentTime = monthDiff(
        new Date(startYear, getMonthFromString(startMonth), 1), 
        endDateInput
      )
    
    return spentTime;
}
  
function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}
  
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
  
function getWords(monthCount) {
    function getPlural(number, word) {
        return number === 1 && word.one || word.other;
    }

    var months = { one: 'month', other: 'months' },
        years = { one: 'year', other: 'years' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12),
        result = [];

    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}