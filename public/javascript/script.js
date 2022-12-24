    const form = document.querySelector('.form-1');
    //for event listening
    form.addEventListener('submit', (event) => {
        if (validateForm()) {
            form.submit();
        } else {
            event.preventDefault();
        }
    })
    const updateForm = document.querySelector('.form-update');
    //for event listening
    updateForm.addEventListener('submit', (event) => {
        if (validateForm()) {
            form.submit();
        } else {
            event.preventDefault();
        }
    })
    console.log(form)
    //function for form validaton
    function validateForm() {
        console.log('Checking');
        var Email = document.getElementById("email").value;
        var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        var Password = document.getElementById("password").value;
        var password1  =document.getElementById("password1").value;
        var err = document.querySelector('.error');
        var text;
        if (Email === "") {
            text = "Please enter a valid email";
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        } else if (Email.match(mailformat) === null) {
            text = "Please enter a valid email";
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        }
        else if (Password === "") {
            text = "Please enter a valid Password";
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        }
        else if (Password.length < 5 && Password.length > 10) {
            text = "Please enter strong password ";
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        }else if(password1 != Password){
            text = "Please enter same password ";
            err.textContent = text;
            err.style.height = '4rem';
            return false;
        }
        return true;
    }