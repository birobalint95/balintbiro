export {createHobbyCards};

function createHobbyCards(introJsonData){ 
    let jsonDataOfHobbies = introJsonData["hobbies"];
    for(let hobby of jsonDataOfHobbies){
        // CREATE CARD
        let hobbyCard = createGenericCardWithImage(hobby.name, hobby.image_location);
        // ADD CARD TO ITS SECTION
        const hobbyCardSection = document.getElementById("hobby-cards-section");
        hobbyCardSection.appendChild(hobbyCard);
    }
};
