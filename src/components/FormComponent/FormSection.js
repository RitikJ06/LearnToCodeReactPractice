import React from 'react'
import './formSection.css'
import { useState } from 'react';


function SkillItems(props){
    const crossSign = 'x';
    return(
        <>
        {props.skillsListToset.map( item =>(
            <div className='skillItem'>
                <span className='skillName'>{item}</span>
                <span className='crossSign' onClick={ () => {
                    props.skillsListToset.splice(props.skillsListToset.indexOf(item), 1);
                    props.setSkillsListtoPass( [...props.skillsListToset] )
                    enableTrialButton(props.skillsListToset);
                }}>
                    {crossSign}
                </span>
            </div>
        ))}
        </>
    )
}

// function to enable claim trail button
function enableTrialButton(skills){
    console.log(skills)
    // get all elements 
    let name = document.getElementById('nameInput').value;
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    let claimButton = document.getElementById('claimButton');

    if(name.trim() && email.trim() && password.trim() && skills.length > 0){
        claimButton.style.background = "#37CC8A";
        claimButton.style.cursor = "pointer";
        return true;
    }
    else{
        claimButton.style.background = "#B5B5B5";
        claimButton.style.cursor = "auto";
    }
    return false;
}

// function to handle click on Claim button
function clickClaim(skills, setskills){
    if( enableTrialButton(skills)){
        document.getElementsByClassName('formHeading')[0].innerHTML = 'You have successfully subscribed to our plan <i class="fa fa-light fa-check"> </i>';
        // reset all fields
        document.getElementById('nameInput').value = "";
        document.getElementById('emailInput').value = "";
        document.getElementById('passwordInput').value = "";
        setskills([]);
        enableTrialButton(skills);
    } 
}

export default function FormSection() {
    const [skillsList, setSkillsList] = useState([]);
    return (
        <section className='formSection'>
        {/* <FormHeading toBold="Try it free 7 days" simpleText="then ₹180/mo. thereafter."/> */}
        <div className='formHeading'>
            <b>Try it free 7 days</b> then ₹180/mo. thereafter.
        </div>
        <div className='formDiv'>
            <input id='nameInput' className='inputField' onInput={() => enableTrialButton(skillsList)} type={'text'} placeholder='Your Name'></input>
            <input id='emailInput' className='inputField' onInput={() => enableTrialButton(skillsList)} type={'email'} placeholder='Email Address'></input>
            <input id='passwordInput' className='inputField' onInput={() => enableTrialButton(skillsList)} type={'password'} placeholder='Password'></input>
            
            <select id='skillListSelect' onChange={ 
                () => {
                    let selectElement = document.getElementById('skillListSelect');
                    if((selectElement.value != "") && !(skillsList.includes(selectElement.value))){
                        skillsList.push(selectElement.value);
                        setSkillsList([...skillsList] );
                    }
                    selectElement.value = '';
                    enableTrialButton(skillsList);
                }}
                className='inputField skillSelect'>
                <option value="" disabled selected hidden>Choose Your Skills</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JS">JS</option>
                <option value="REACT">REACT</option>
                <option value="PYTHON">PYTHON</option>
                <option value="JAVA">JAVA</option>
                <option value="GIT">GIT</option>
                <option value="AWS">AWS</option>
            </select>
            <div className='skillsList'>
                <SkillItems skillsListToset={skillsList} setSkillsListtoPass={setSkillsList}/>
            </div>
            <button id='claimButton' onClick={() => (clickClaim(skillsList, setSkillsList))}>CLAIM YOUR FREE TRIAL</button>
            <div className='TCText'>By clicking the button you are agreeing to our <b>Terms and Services</b></div>
        </div>
    </section>
  )
}
