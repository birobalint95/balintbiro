import { createTechnicalSkillCards } from "./create_skill_cards.js";
import { createLanguageSkillCards } from "./create_skill_cards.js";
import { createCertificationCards } from "./create_certification_cards.js";
import { createHobbyCards } from "./create_hobby_cards.js";
import { createStudyItems } from "./create_study_items.js";
import { createExperienceItems } from "./create_experience_items.js";

export {populatePage};

function populatePage(pageName){

    fetch("./static/json/role_details.json")
    .then(function(response){
    return response.json();
    })
    .then(function(rolesJsonData){
        if (pageName == "index.md") {
            createTechnicalSkillCards(rolesJsonData);
        } else if (pageName == "experiences.md") {
            createExperienceItems(rolesJsonData);
        }
        
    });

    if (pageName == "index.md") {
        fetch("./static/json/intro_details.json")
        .then(function(response){
        return response.json();
        })
        .then(function(introJsonData){
            createLanguageSkillCards(introJsonData);
            createCertificationCards(introJsonData);
            createHobbyCards(introJsonData);
            createStudyItems(introJsonData);
        });
    }

}
