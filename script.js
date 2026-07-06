let loginForm = document.getElementById("loginForm");

if (loginForm) {

    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");

    let loginEmailError = document.getElementById("loginEmailError");
    let loginPasswordError = document.getElementById("loginPasswordError");

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        loginEmailError.textContent = "";
        loginPasswordError.textContent = "";

        if (loginEmail.value.trim() == "") {

            loginEmailError.textContent = "Email is required";

        }

        if (loginPassword.value == "") {

            loginPasswordError.textContent = "Password is required";

        }

        if (
            loginEmail.value.trim() != "" &&
            loginPassword.value != ""
        ) {

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = users.find(function (user) {

                return (
                    user.email == loginEmail.value.trim() &&
                    user.password == loginPassword.value
                );

            });

            if (user) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(user)
                );

                window.location.href = "dashboard.html";

            }

            else {

                alert("Invalid Email or Password");

            }

        }

    });

}


let registerForm = document.getElementById("registerForm");

if (registerForm) {

    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmPassword");

    let nameError = document.getElementById("nameError");
    let phoneError = document.getElementById("phoneError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let confirmError = document.getElementById("confirmError");

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        nameError.textContent = "";
        phoneError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        let namePattern = /^[A-Za-z ]+$/;
        let phonePattern = /^[6-9][0-9]{9}$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameInput.value.trim() == "") {

            nameError.textContent = "Name is required";

        }

        else if (nameInput.value.trim().length < 3) {

            nameError.textContent = "Minimum 3 characters required";

        }

        else if (!namePattern.test(nameInput.value.trim())) {

            nameError.textContent = "Only letters are allowed";

        }

        if (phoneInput.value.trim() == "") {

            phoneError.textContent = "Phone number is required";

        }

        else if (!phonePattern.test(phoneInput.value.trim())) {

            phoneError.textContent = "Enter a valid phone number";

        }

        if (emailInput.value.trim() == "") {

            emailError.textContent = "Email is required";

        }

        else if (!emailPattern.test(emailInput.value.trim())) {

            emailError.textContent = "Enter a valid email";

        }

        if (passwordInput.value == "") {

            passwordError.textContent = "Password is required";

        }

        else if (passwordInput.value.length < 6) {

            passwordError.textContent = "Minimum 6 characters";

        }

        if (confirmPasswordInput.value == "") {

            confirmError.textContent = "Confirm your password";

        }

        else if (passwordInput.value != confirmPasswordInput.value) {

            confirmError.textContent = "Passwords do not match";

        }

        if (

            namePattern.test(nameInput.value.trim()) &&
            phonePattern.test(phoneInput.value.trim()) &&
            emailPattern.test(emailInput.value.trim()) &&
            passwordInput.value.length >= 6 &&
            passwordInput.value == confirmPasswordInput.value

        ) {

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let emailExists = users.find(function (user) {

                return user.email == emailInput.value.trim();

            });

            if (emailExists) {

                emailError.textContent = "Email already registered";

                return;

            }

            let user = {

                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value

            };

            users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert("Registration Successful");

        console.log("Redirecting...");

        window.location.href = "dashboard.html";

        }

    });

}