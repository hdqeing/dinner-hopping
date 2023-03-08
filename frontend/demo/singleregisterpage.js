const btnSubmit = document.querySelector('#button-submit');
const tfName = document.getElementById('textfield-name');
const tfEmail = document.getElementById('textfield-email');
const tfPhone = document.getElementById('textfield-phone');
const radioHost = document.getElementsByName('host');
const tfStreet = document.getElementById('textfield-street');
const tfHouseNumber = document.getElementById('textfield-housenumber');
const ckboxVegetarian = document.getElementById('vegetarian');
const ckboxVegan = document.getElementById('vegan');
const ckboxEnglish = document.getElementById('englishSpeaker');
const ckboxGerman = document.getElementById('germanSpeaker');
const ckboxAppetizer = document.getElementById('appetizer');
const ckboxMainCourse = document.getElementById('mainCourse');
const ckboxDessert = document.getElementById('dessert');
const tfComment = document.getElementById('comment');
const registerForm = document.getElementById('register-form');


function sendData(){
    let formData = new FormData();
    formData.append("name", tfName.value);
    formData.append('email', tfEmail.value);
    formData.append('phonenumber', tfPhone.value)
    formData.append('host', parseInt(radioHost.value));
    formData.append('street', tfStreet.value);
    formData.append('houseNumber', tfHouseNumber.value);
    let vegetarian = 0;
    let vegan = 0;
    if (ckboxVegetarian.checked){
        vegetarian = 1;
    }
    if (ckboxVegan.checked){
        vegan = 1;
    }
    formData.append('vegetarian', vegetarian);
    formData.append('vegan', vegan);
    let englishSpeaker = 0;
    let germanSpeaker = 0;
    if (ckboxEnglish.checked){
        englishSpeaker = 1;
    }
    if (ckboxGerman.checked){
        germanSpeaker = 1;
    }
    formData.append('englishSpeaker', englishSpeaker);
    formData.append('germanSpeaker', germanSpeaker);
    let appetizer = 0;
    let mainCourse = 0;
    let dessert = 0;
    if (ckboxAppetizer.checked){
        appetizer = 1;
    }
    if (ckboxMainCourse.checked){
        mainCourse = 1;
    }
    if (ckboxDessert.checked){
        dessert = 1;
    }
    formData.append('appetizer', appetizer);
    formData.append('mainCourse', mainCourse);
    formData.append('dessert', dessert);
    formData.append('comment', tfComment.value);
    /*
    fetch("dinner-hopping.azurewebsites.net/register", {
        method:"POST",
        
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        
        body: JSON.stringify(formData)
    }).then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })
    */
    const myHeaders = {}
    const myInit = {
    method: "GET",
    mode:'cors',
    headers: myHeaders,
    credentials: "include"
    }
    fetch("https://dinner-hopping.azurewebsites.net/allow-cors", myInit).then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })

};

registerForm.addEventListener("submit", ()=>{
    fetch("https://dinner-hopping.azurewebsites.net/")
    .then(res => res.json())
    .then(data => console.log(data))
});