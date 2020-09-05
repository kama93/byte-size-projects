const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordMatch = false;

function storeFromData(){
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    }
    console.log(user)
}

function validateForm(){
    // Using Contraint API
    isValid = form.checkValidity();
    // Style main message for an error
    if(!isValid)
    {message.textContent = 'Plaese fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
        return}
    // Check if password match
    if(password1El.value === password2El.value){
        passwordMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    }else{
        passwordMatch= false;
        message.textContent = 'Make sure passwords match';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return
    }
    // If form is valid and password match
    if(isValid && passwordMatch){
        message.textContent = "Successfully Registered";
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

function processFormData(e){
    e.preventDefault();
    // Validate form
    validateForm();
    // Submit Data if Valid
    if(isValid && passwordMatch){
        storeFromData();
    }
}

// Event Listner
form.addEventListener('submit', processFormData);