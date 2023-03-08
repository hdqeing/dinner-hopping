const btnSubmit = document.querySelector('#button-submit');
const tfName = document.getElementById('textfield-name');
const tfEmail = document.getElementById('textfield-email');
const tfPhone = document.getElementById('textfield-phone');
const radioHost = document.querySelector('input[name="host"]:checked')
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

function sendData(event){
    event.preventDefault();
    let vegetarian = 0;
    let vegan = 0;
    let englishSpeaker = 0;
    let germanSpeaker = 0;
    let appetizer = 0;
    let mainCourse = 0;
    let dessert = 0;
    let host = 0;
    let housenumber=0;
    if (ckboxVegetarian.checked){
        vegetarian = 1;
    }
    if (ckboxVegan.checked){
        vegan = 1;
    }
    if (ckboxEnglish.checked){
        englishSpeaker = 1;
    }
    if (ckboxGerman.checked){
        germanSpeaker = 1;
    }
    if (ckboxAppetizer.checked){
        appetizer = 1;
    }
    if (ckboxMainCourse.checked){
        mainCourse = 1;
    }
    if (ckboxDessert.checked){
        dessert = 1;
    }
    host = parseInt(radioHost.value);
    housenumber = parseInt(tfHouseNumber.value);

    info = {
        "name": tfName.value,
        'email': tfEmail.value,
        'phonenumber': tfPhone.value,
        'host': host,
        'street': tfStreet.value,
        'houseNumber': housenumber,
        'vegetarian': vegetarian,
        'vegan': vegan,
        'englishSpeaker': englishSpeaker,
        'germanSpeaker': germanSpeaker,
        'appetizer': appetizer,
        'mainCourse': mainCourse,
        'dessert': dessert,
        'comment': tfComment.value
    };

    console.log(info);
    fetch("https://dinner-hopping.azurewebsites.net/register", {
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }).then(res => res.json())
    .then(data=> console.log(data));

};

const buttonSubmit = document.getElementById('button-submit')
buttonSubmit.addEventListener("click", sendData, false)