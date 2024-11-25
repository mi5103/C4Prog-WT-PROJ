document.getElementById("contact").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if(!name || !email || !message){
        alert("All fields are required");
        return;
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(email)){
        alert("Please enter a valid email address");
        return;
    }

    console.log('Name: ', name);
    console.log('Email: ', email);
    console.log('Message: ', message);

    // document.getElementById("contact").submit();

});