const riddleCheckbox = document.getElementById("riddles");
const triviaCheckbox = document.getElementById("trivia");

riddleCheckbox.addEventListener("change", checkboxStatus);
triviaCheckbox.addEventListener("change", checkboxStatus);

function checkboxStatus() {
    if (!riddleCheckbox.checked && !triviaCheckbox.checked) {
        console.log('Nothing is checked');
    } else if (triviaCheckbox.checked){
        riddleCheckbox.checked = false;
        console.log('Trivia is checked');
    } else if (riddleCheckbox.checked){
        triviaCheckbox.checked = false;
        console.log('Riddles is checked');
    }
}

const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const filterInput = document.getElementById("filter");
const resultMessage = document.getElementById("message");


submitButton.addEventListener("click", function(event){
    event.preventDefault();
    getResponse();
});

resetButton.addEventListener("click", resetForm);

function getResponse(){
    let url;

    if (riddleCheckbox.checked){
        let limit = checkNumber();
        if(limit === false) return;
        url = `https://api.api-ninjas.com/v1/riddles?limit=${limit}`;
    } else if (triviaCheckbox.checked){
        let category = checkCategory();
        if(category === false) return;
        url = `https://api.api-ninjas.com/v1/trivia?category=${category}`;
    } else{
        console.log("Nothing is checked");
        return;
    }
    console.log(url);

    resultMessage.innerHTML = "";
    fetch(url,{
        method: "GET",
        headers:{'X-Api-Key': 'tBxhEwt4vrE231i/ziJyog==fiwaHCcRIg6F2pWz'}
    })
        .then(function(response){
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.log("Error response data:", errorData);
                    let errorMessage = errorData.error || `Error: ${response.status}`;
                    throw new Error(errorMessage);
                });
            }
            return response.json();
        }).then(function(data){
        console.log(data);

        if (riddleCheckbox.checked) {
            data.forEach(riddleData => {
                const results =
                    `<p><strong>< ${riddleData.title}></strong></p>
                     <p>Question: ${riddleData.question}</p>
                     <p>Answer: ${riddleData.answer}</p>
                    `;
                resultMessage.innerHTML += results;
            });
        } else if (triviaCheckbox.checked) {
            data.forEach(triviaData => {
                const results =
                    `<p>Question: ${triviaData.question}</p>
                     <p>Answer: ${triviaData.answer}</p>
                    `;
                resultMessage.innerHTML += results;
            });
        }
    })
        .catch(function(error){
            console.log("Failed to call API", error);
            resultMessage.innerHTML = `<p>${error.message}</p>`;
        });
}

function resetForm(){
    riddleCheckbox.checked = false;
    triviaCheckbox.checked = false;
    filterInput.value = "";
    document.getElementById("message").innerHTML = "";
}

function checkNumber(){
    let number = filterInput.value.trim();
    if (number === ""){
        return 1; // if no input, return one default result
    }
    number = parseInt(number);
    if (isNaN(number) || number < 1 || number > 20){
        resultMessage.innerHTML = "Please enter a number between 1 and 20";
        return false; // if the input is out of range or not numeric, error message
    }
    return number;
}

function checkCategory(){
    let input = filterInput.value.trim().toLowerCase();
    const categories = [
        "artliterature", "language", "sciencenature", "general",
        "fooddrink", "peopleplaces", "geography", "historyholidays",
        "entertainment", "toysgames", "music", "mathematics",
        "religionmythology", "sportsleisure"
    ];

    if(input === ""){
        return "music"; // if not input, return default category
    }
    if(!categories.includes(input)){
        resultMessage.innerHTML =
            `<p>No results found for "${input}".</p>
            <p>Possible categories are: </p>
            <p>${categories.join("<br>")}</p>`;
        return false; // if input is not included, error message
    }
    return input;
}