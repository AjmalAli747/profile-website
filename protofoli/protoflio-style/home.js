// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBexJBNvfKJIjRhTdjci9xtj6CZJVUxgS4",
    authDomain: "profile-form-bf0d7.firebaseapp.com",
    projectId: "profile-form-bf0d7",
    storageBucket: "profile-form-bf0d7.appspot.com",
    messagingSenderId: "119461661751",
    appId: "1:119461661751:web:d2483cba8a3629b4cf43b2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let contactInfo = firebase.database().ref("BIO DATA");

//   ****************************************** window scroll *******************************

const bars = document.getElementById("bars");
const navbar = document.getElementById("navbar");
const header = document.querySelector("header");
// scroll button 
const scrollTop = document.getElementById("scrollTop");

bars.addEventListener("click", () => {
    navbar.classList.toggle("navbarActive");
})

const scrollFunction = () => {
    const scrollWindow = window.pageYOffset;
    if(scrollWindow > 40){
        header.classList.add("headerSetColor");
    }else{
        header.classList.remove("headerSetColor");
    }

    // scroll button 
    if(scrollWindow > 120){
        scrollTop.classList.add("scrollButton");
    }else{
        scrollTop.classList.remove("scrollButton");
    }
}

window.addEventListener("scroll", scrollFunction);

// **************************** form **************************
const pop = document.querySelector("#pop");
const button = document.querySelector("#btn");
const submit = document.querySelector("#submit");

submit.addEventListener("click", () => {
    pop.classList.add("activePop");
})

button.addEventListener("click", () => {
    pop.classList.remove("activePop");
})

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputFaild();
})

// input function 
function inputFaild(){
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    console.log(name, email, message);
    // if conditation 
    ifCondtionPop(name, email, message);
    // relaTime Database 
    saveContactInfo(name, email, message);
}

// if condition function 
function ifCondtionPop(name, email, message){
    const popHeading = document.getElementById("popHeading");
    if(name == ""){
        popHeading.innerHTML = `<h1>Enter Name</h1>`;
    }else if(email == ""){
        popHeading.innerHTML = `<h1>Enter Email</h1>`;
    }else if(message == ""){
        popHeading.innerHTML = `<h1>Enter Message</h1>`;
    }else{
        popHeading.innerHTML = `<h1>Thanks</h1>`;
        form.reset();
    }

}

// Real Time Database 
function saveContactInfo(name, email, message){
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name : name,
        email : email,
        message : message,
    })
}

// google sign up 
const googleSignup = document.getElementById("googleSignup");
googleSignup.addEventListener("click", googleSignupFunction);

function googleSignupFunction(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
      swal("Congratulations!", `${result.user.displayName} : ${result.user.email}`, "success");
  }).catch((error) => {
      swal("Error!", `Error ${error.message}`, "error");
  });
}

// github sign up 
const githubSignup = document.getElementById("githubSignup");
githubSignup.addEventListener("click", () => {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        console.log(result);
      swal("Congratulations!", `Welcome : ${result.user.email}`, "success");
    })
    .catch(error => {
      swal("Error!", `Error ${error.message}`, "error");
    })
})

// click list item and remove unoder list and toggle button click add unoder list 
const ul = document.querySelectorAll("ul li");
const barsToggle = document.getElementById("bars");

barsToggle.addEventListener("click", () => {
    document.querySelector("ul").style.display = "block";
})

ul.forEach(element => {
    element.addEventListener("click", function(){
        document.querySelector("ul").style.display = "none";
    })
})