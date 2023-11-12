---
title: About | Balint Biro
layout: template
filename: index
--- 

<h2 class="main-title">About</h2>

<div class="intro">
    <div style="width: 700px;">
        <img class="intro-image" src="static/images/cv_photo.jpg" alt="CV photo">
    </div>
    <div class="intro-text">
        <p>Hi, my name is Balint Biro and welcome to my personal website!</p>
        <p>This website is a reflection of my passions, interests, and experiences. I am a full-time Product Owner, currently living in Budapest with my beautiful girlfriend, Anna and our crazy black cat, Dante.</p>
        <p>Through these pages, I'll be sharing a piece of my world and the stories that shape it.</p>
        <p>Please also find me on:</p>
        <a class="contact-option" href="mailto:birobalint95@gmail.com" style="margin-right: 16px;"><i class="fa fa-envelope"></i></a>
        <a class="contact-option" href="https://www.linkedin.com/in/balintbiro" target="_blank" style="margin-right: 16px;"><i class="fa fa-linkedin-square"></i></a>
        <a class="contact-option" href="https://www.facebook.com/biro95" target="_blank" style="margin-right: 16px;"><i class="fa fa-facebook-square"></i></a>
        <a class="contact-option" href="https://www.instagram.com/birobalint" target="_blank"><i class="fa fa-instagram"></i></a>
    </div>
</div>

<div class="content-section">
    <group id="group-of-details" style="position: -webkit-sticky; position: sticky; top: 90px; background-color: #232931; z-index: 99;">
        <a id="about-skills" class="detail-category selected" href="javascript:void(0)" onclick="selectAboutDetailTab(this)">Skills</a>
        <a id="about-certifications" class="detail-category" href="javascript:void(0)" onclick="selectAboutDetailTab(this)">Certifications</a>
        <a id="about-studies" class="detail-category" href="javascript:void(0)" onclick="selectAboutDetailTab(this)">Studies</a>
        <a id="about-hobbies" class="detail-category" href="javascript:void(0)" onclick="selectAboutDetailTab(this)">Hobbies</a>
    </group>
    <div id="rounded-spacer-for-tab-contents"></div>
    <div id="tab-content-skills-about" title="about-skills" class="tab-content displayed">
        <div class="skill-area-selector"> 
            <span class="skill-area-selector-text">Show skills related to</span>
            <select id="skill-area-selector-options" class="skill-area-selector-options">
                <option value="languages">Languages</option>
                <option value="methodologies-and-frameworks">Methodologies and frameworks</option>
                <option value="management-and-ownership">Management and ownership</option>
                <option value="tools-and-software">Tools and software</option>
                <option value="programming-and-web-development">Programming and web development</option>
                <option value="processes">Processes</option>
                <option value="support-skills">Support skills</option>
            </select>
        </div>
        <!-- <div id="filter-bar" class="filter-bar">
            <ul class="ks-cboxtags">
                <span class="checkbox-pretext">Filter skills:</span>
                <li>
                    <input class="labelSelectorCheckbox" type="checkbox" id="checkboxOne" value="languages" checked="" onclick="selectSkillArea(this)"/>
                    <label for="checkboxOne">
                        <span class="checkbox-text">Languages</span>
                    </label>
                </li>
                <li>
                    <input class="labelSelectorCheckbox" type="checkbox" id="checkboxTwo" value="methodologies" checked="" onclick="selectSkillArea(this)"/>
                    <label for="checkboxTwo">
                        <span class="checkbox-text">Methodologies</span>
                    </label>
                </li>
                <li>
                    <input class="labelSelectorCheckbox" type="checkbox" id="checkboxThree" value="tools" checked="" onclick="selectSkillArea(this)"/>
                    <label for="checkboxThree">
                        <span class="checkbox-text">Tools</span>
                    </label>
                </li>
                <li>
                    <input class="labelSelectorCheckbox" type="checkbox" id="checkboxFour" value="programming" checked="" onclick="selectSkillArea(this)"/>
                    <label for="checkboxFour">
                        <span class="checkbox-text">Programming</span>
                    </label>
                </li>
            </ul>
        </div> -->
        <div id="languages-skill-cards-div" style="display: block;">
            <p style="border-bottom: 2px solid rgb(53 53 53); line-height:0.1em; margin-bottom: 0px;margin-top: 0px;color: rgba(80, 216, 144);">
                <span style="background-color: #181c21;padding-left: 40px;padding-right: 20px;">Languages</span>
            </p>
            <section id="language-skill-cards-section" class="skill-cards"></section>
        </div>
    </div>
    <div id="tab-content-certifications-about" title="about-certifications" class="tab-content">
        <section id="certification-cards-section" class="certification-cards"></section>
    </div>
    <div id="tab-content-studies-about" title="about-studies" class="tab-content">
        <div class="container-of-timeline-of-studies">
            <div class="timeline-of-studies">
                <ul id="studies-list" class="list-of-studies"></ul>
            </div>
        </div>
        <div id="content-of-studies" class="container-of-content-of-studies"></div>
    </div>
    <div id="tab-content-hobbies-about" title="about-hobbies" class="tab-content">
        <section id="hobby-cards-section" class="hobby-cards"></section>
    </div>
</div>
