import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {getDatabase, ref, child, get,set, update, remove} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyCsOTOjAssklqM9SDBjvkJjnENtcuikHzU",
    authDomain:"skills-e71f3.firebaseapp.com",
    databaseURL:"https://skills-e71f3-default-rtdb.firebaseio.com",
    projectId:"skills-e71f3",
    storageBucket:"skills-e71f3.appspot.com",
    messagingSenderId:"605863012527",
    appId:"1:605863012527:web:214cb1a95221b8450f0c5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getDatabase();

//selecting the elements

let emp_name=document.querySelector(".emp_name");
let skill_name=document.querySelector(".skill_name");
let skill_lvl=document.querySelector(".skill_lvl");
let last_update=document.querySelector(".date");

let addbtn=document.querySelector(".add");
let updatebtn=document.querySelector(".edit");
let delbtn=document.querySelector(".del");


let addskillbtn= document.querySelector('.add_skill');
let remskillbtn= document.querySelector(".del_skill");
let view_table=document.querySelector('.view_table');
let view_form=document.querySelector('.view_form');
let search_cont=document.querySelector('.searchFilter');


let checkDatabtn=document.querySelector('.checkDatabtn');
let skill_list =document.querySelector('.Skill_List');
let para =document.querySelector('.para');
let form= document.querySelector('.update');
let pie= document.querySelector('.pie');
let ctx= document.querySelector('#myChart');

let togglePie= document.querySelector('.Visualize');

//Put default value of date as today's date if not entered by User
let currentDate = new Date().toJSON().slice(0, 10);

//FUNCTIONS

//Toggle Function

function toggle(element){

    if (element.style.display !== 'none') {
        element.style.display = 'none';
    }
    else {
        element.style.display = 'block';
    }
};

//prevent the action of clicking Enter
form.addEventListener('keydown', function(e) {
if (e.key === 'Enter') {
    e.preventDefault(); // Prevent the default action (submitting the form)
}
});

//Form Functions
function addData(e){
e.preventDefault();
set(ref(db, 'Employee/'+emp_name.value), {
    NAME: emp_name.value,

    //for dynamic keys you out to use [form.name]
    SKILLSET: {[skill_name.value]: {SKILL_NAME: skill_name.value,
                SKILL_LEVEL: skill_lvl.value}},

    //if date not entered, set today's date
    LAST_UPDATED_ON: (last_update.value=="")? (currentDate): (last_update.value)
}).then(()=>{
    alert("Data Added Successfully!");

    //Reset the form
    var allInputs = document.querySelectorAll('input');
    skill_lvl.value="";
    allInputs.forEach(singleInput => singleInput.value = '');
}).catch((e)=>{
    alert("Data Entry Attempt Failed\n Try Again with correct inputs\n");
    console.log(e);
});

}


function updateSkillLvl(e){
e.preventDefault();
const level_update= `Employee/${emp_name.value}/SKILLSET/${skill_name.value}`;
const date_update = `Employee/${emp_name.value}`;
try{

    //update the skill level
    update(ref(db, level_update), {
    
    SKILL_LEVEL: skill_lvl.value
    
    });


    //update the date

    update(ref(db,date_update), {

    LAST_UPDATED_ON: (last_update.value=="")? (currentDate): (last_update.value)

    });

    alert("Data Updated Successfully!");

    //Reset the form
    var allInputs = document.querySelectorAll('input');
    skill_lvl.value="";
    allInputs.forEach(singleInput => singleInput.value = '');
    
    }
    catch(err){
    alert("Data Updation Failed\n Try Again with correct inputs\n");
    console.log(e);

    }

}

function remData(e){
e.preventDefault();
remove(ref(db, 'Employee/'+emp_name.value)).then(()=>{
    alert("Data Removed Successfully!");

    //Reset the form
    var allInputs = document.querySelectorAll('input');
    skill_lvl.value="";
    allInputs.forEach(singleInput => singleInput.value = '');
}).catch((e)=>{
    alert("Data Removal Failed\n Try Again with correct inputs\n");
    console.log(e);
}

)

}

function checkData(e){
e.preventDefault();
const dbRef= ref(db);
get(child(dbRef, `Employee/${emp_name.value}`)).then((snapshot)=>{
    if(snapshot.exists()){
    const skillSetArray = snapshot.val().SKILLSET;

    //Clearing prev Data
    para.innerText = '';

    let i=1;
    //Way of accessing the objects
    for (let skill in skillSetArray) {
        let entry = skillSetArray[skill];
        para.innerHTML += `${i}. `;
        para.innerHTML += `${entry.SKILL_NAME} -> ${entry.SKILL_LEVEL}<br>`;

        para.innerHTML += `<br>`;
        i++;

    };

    para.innerHTML += `-----------------------------------------------------`;

    skill_list.style.display = "block";
    // alert("Here is your Data!");
    }
    else{
    //Reset
    emp_name.value="";

    skill_list.style.display="none";


    alert("Data not found");

    }
}).catch((err)=>{
    alert("Some Issue");
    console.log(err);
});

}


async function AddSkill(e){
e.preventDefault();
try {
const SkillListRef = `Employee/${emp_name.value}/SKILLSET/${skill_name.value}`;
const date_update = (`Employee/${emp_name.value}`);

await set(ref(db, SkillListRef), {
    SKILL_NAME: skill_name.value,
    SKILL_LEVEL: skill_lvl.value

})

//update date
await update(ref(db,date_update), {

LAST_UPDATED_ON: (last_update.value=="")? (currentDate): (last_update.value)

})


//Reset the form
var allInputs = document.querySelectorAll('input');
skill_lvl.value="";
allInputs.forEach(singleInput => singleInput.value = '');



alert("Skill Added Successfully!");
} catch (error) {
    alert("Issue!!\n Try Again\n");
    console.error("Error adding skill: ", error);
}
}

function RemSkill(e){
e.preventDefault();
const SkillListRef = (`Employee/${emp_name.value}/SKILLSET/${skill_name.value}`);
const date_update = `Employee/${emp_name.value}`;

remove(ref(db,SkillListRef)).then(()=>{
    

    //Reset the form
    var allInputs = document.querySelectorAll('input');
    skill_lvl.value="";
    allInputs.forEach(singleInput => singleInput.value = '');
    alert("Skill Removal Successful");


    //update date
update(ref(db,date_update), {

    LAST_UPDATED_ON: (last_update.value=="")? (currentDate): (last_update.value)
    
    })


}).catch((e)=>{
    alert("Skill Removal Failed\n Try Again with correct inputs\n");
    console.log(e);
}

)

}

//onclick events
addbtn.addEventListener('click', (addData));
updatebtn.addEventListener('click', updateSkillLvl);
delbtn.addEventListener('click', remData);
checkDatabtn.addEventListener('click', checkData);

addskillbtn.addEventListener('click', AddSkill);

remskillbtn.addEventListener('click', RemSkill);



// --------------FORM----------------
//The way to pass in arguments in addEventListener (using wrapper function)
view_form.addEventListener('click', ()=>{
toggle(form);
});
view_table.addEventListener('click', ()=>{
getData();
toggle(table);
toggle(search_cont);
});

// --------------table--------------------
let table= document.querySelector('.table');


let slno=1;
let tbody = document.querySelector('tbody');
//Function to add items to the table
function AddItem_Table(name, skillset, lastdate){
let trow = document.createElement("tr");
let td1 = document.createElement('td');
let td2 = document.createElement('td');
let td3 = document.createElement('td');
let td4 = document.createElement('td');


//Adding Classlists for search and filter option
td2.classList += "nameField";
td3.classList+="skillsetField";
td4.classList+="dateField";

td1.innerHTML= slno++;
td2.innerHTML= name;
//Skillset entry:
for(let entry in skillset){
    let skill= skillset[entry];
    td3.innerHTML += `<br>Skill Name: ${skill.SKILL_NAME} <br>Skill Level: ${skill.SKILL_LEVEL}<br><br>`;
}
td4.innerHTML= lastdate;

trow.appendChild(td1);
trow.appendChild(td2);
trow.appendChild(td3);
trow.appendChild(td4);

tbody.appendChild(trow);
}

function AddAllItems(emp){
slno=1;
tbody.innerHTML=""; 


for (let names in emp) {
        let entry = emp[names];

        AddItem_Table(names, entry.SKILLSET, entry.LAST_UPDATED_ON);

    };

}

function getData(){
const Ref = ref(db);
get(child(Ref, "Employee/"))
.then((snapshot)=>{
    AddAllItems(snapshot.val());
}).catch((e)=>{
    alert("Some issue in accessing DataBase\n");
    console.log(e);
})
}



//------------------------PIE CHART-------------------------
let chart; //Important variable 
const Ref= ref(db);
Chart.defaults.font.size = 20;


//Using Chart.js

function CreatePieChart(){

//Create labels with label count;
let skillCount={};

get(child(Ref, `Employee`)).then((snapshot)=>{
if(snapshot.exists()){
    let entry = snapshot.val();
    for(let names in entry){
    for(let skill in entry[names].SKILLSET){
        
        if(skill in skillCount){
        skillCount[skill]+=1;
        }
        else{
        skillCount[skill]=1;
        }

    }
    }

//  console.log(skillCount);

    let labelList= Object.keys(skillCount);
    let dataList= Object.values(skillCount);

    if (chart) {
    chart.destroy();
    }

chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: labelList,
    datasets: [{
        data: dataList,
    

        hoverOffset: 15

    }]
    }
})
}
}).catch((err)=>{
    alert("error");
    console.log(err);
})


}

pie.addEventListener('click', ()=>{

CreatePieChart();
toggle(togglePie);

});

//Search&Filter the database
let searchbar= document.querySelector('.searchbar');
let searchbtn = document.querySelector('#searchbtn');
let category = document.querySelector('#Category');
let found;

function SearchTable(category){
let filter = searchbar.value.toLowerCase();
let tr = tbody.getElementsByTagName("tr");

for(let i=0; i< tr.length; i++){
    let td = tr[i].getElementsByClassName(category);
    for(let j=0; j< td.length; j++){
    if(td[j].innerHTML.toLowerCase().includes(filter)){
        found=true;
    }
    }

    if(found){
    tr[i].style.display="";
    found=false;

    }
    else{
    tr[i].style.display="none";
    }
}
}

searchbtn.addEventListener('click', ()=>{
if(searchbar.value=="");
else if(category.value==1){
    SearchTable("nameField");
}

else if(category.value==2){
    SearchTable("skillsetField");
}

else if(category.value==3){
    SearchTable("dateField");
}

})