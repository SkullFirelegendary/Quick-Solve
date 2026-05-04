/* Arthur: Maleick Williams
Student ID: 2111578
Date: April 29, 2026
Title: Design a web base application that is guided by the projects constraints including but not limited to; 
iv) Email address must be validated to only accept email addresses that ends with “@gmail.com”.
v) Change the background color of the answer to match if the answer is correct or incorrect*/

/*Declarations*/
const playerRegistrationData = {}, icons = document.querySelectorAll(".bgIcon"),
startGameBtn = document.getElementById('btnStartGame'), progressArea = document.getElementById("progressArea"),  progressWrapper = document.getElementById("progressWrapper"), loggedInTag = document.getElementById("userTag"), playArea = document.getElementById("gameArea"), 
showAllPlayerArea = document.getElementById("showAllPlayers"), submitAnswer = document.getElementById("checkAnswer"), 
answerArea = document.getElementById("answer-row"), percentScoreArea = document.getElementById("showPercentageRow"), 
table = document.createElement("table"), genderChartElement = document.getElementById('genderChart'), percentChartElement = document.getElementById('percentChart'),
currentPercentChartElement = document.getElementById('mostRecentPercentChart'), progress = document.createElement('div');

var amtOfUsers = [0, 0, 0, 0, 0, 0 ], numberOfUser = 1, loggedInUser = "", flag = false, percentArr = ["< 50", "50-59", "60-69", "70-79", "80-89", "90-100"],
currentPercentArr = [0, 0, 0, 0, 0, 0], last_score = -1, lastLoggedInUser, chart1, chart2, chart3, checkAnswerState = 0,
int1, int2, int3;//Variables that stores the two random generate number

/*Gameplay Variables */
var operation = document.getElementById("operationSymb"), 
equalSymbol = document.getElementById("equSymb"),
// answer = document.getElementById("ansD1"), 
// answer2 = document.getElementById("ansD2"), 
// answer3 = document.getElementById("ansD3"),
userAnswer = document.getElementById("answerBox"),
endGameButton = document.getElementById("endGameBtn"),
findPercentButton = document.getElementById("findPercentBtn"), currentMathSymbol = "",
digit1 = document.getElementById("numArea"), digit2 = document.getElementById("numArea2"); //Digit Images

playerRegistrationData["Maleick"] = {
    firstName: "Maleick", 
    lastName: "Williams",
    dob: "06-08-2014",
    gender: "Male",
    email: "mkawilliams21@gmail.com",
    password: "Admin",
    correctAns: 8,
    incorrectAns: 1,
    id: 1
};//Admin Sign in

/*Implementation of Mutators, Accessors, and Methods.*/
//Login
function getUsername(){
    return document.getElementById("username");
}
function getLoginPassword(){
    return document.getElementById("loginKey");
}
//Register
function getFirstName(){
    return document.getElementById("firstName");
}''
function getLastName(){
    return document.getElementById("lastName");
}
function getRegisteredDOB(){
    return document.getElementById("DOB");
}
function getGender() {
    return document.querySelectorAll('input[name="Gender"]');
}
function getSexType() {
    const genderSelected = document.querySelector('input[name="Gender"]:checked');
    return genderSelected ? genderSelected.value : "";
}
function getEmail(){
    return document.getElementById("email");
}
function getAge() {
    return document.getElementById("age");
}
function getRegisteredUsername(){
    return document.getElementById("username2");
}
function getRegisteredPassword(){
    return document.getElementById("registerKey");
}

/* Functions that handle the Login and register page*/
function SignIn() {
    document.getElementById('loginPage').style.transform = "scale(1)";
}

function RegisterPage() {
    document.getElementById('loginPage').style.transform = "scale(0)";
    document.getElementById('registerPage').style.transform = "scale(1)";
    setTimeout(() => {
        document.getElementById('loginPage').style.display = "none";
        document.getElementById('registerPage').style.display = "";  
    }, 280);  
}

function LoginPage() {
    document.getElementById('loginPage').style.transform = "scale(1)";
    document.getElementById('registerPage').style.transform = "scale(0)";
    setTimeout(() => {
        document.getElementById('loginPage').style.display = "";
        document.getElementById('registerPage').style.display = "none";  
    }, 280);
}
function NavigateAndLogin() {
    SignIn();
    location.assign('index.html');
}

function IconClose() {
    document.getElementById('loginPage').style.transform = "scale(0)";
    document.getElementById('registerPage').style.transform = "scale(0)";
    document.getElementById('registerPage').style.display = "";
    document.getElementById('loginPage').style.display = "";
}

/*Program Logic - Validations*/
function ValidateEmail(){//Fires to validate email
    const email = getEmail();

    if (!IsEmailValid()) {
        window.alert("Please enter a valid Gmail address");
        email.value = "";
    }
}
function ValidateDOB(){//Fires to validate DOB
    const age = getAge();

    if (!IsDOBValid() && age.value >= 13) {
        window.alert("This age does not meet the player requirement.\nPlayer must be between age 8 and 12!");
    }
}

function CalculateAge(){//Fires to calculate current user age
    const date = new Date(getRegisteredDOB().value), //Convert DOB value to date format.
    now = new Date().getFullYear(),//Gets current system date.
    year = date.getFullYear();

    return Math.abs(now - year);//Calculates current age
}

function IsEmailValid(){//Fires to validate email address
    const email = getEmail().value,
    regex = /^[a-zA-Z0-9._\-]+@gmail\.com$/; // Regular expression to validates if the email ends with "@gmail.com"
    return regex.test(email);
}

function IsDOBValid(){//Fires to validate DOB
    var yearOld = CalculateAge();
    
    if (!isNaN(yearOld) && yearOld > 0 && yearOld <= 100) {
        getAge().value = yearOld;//Accept Value.
        if (yearOld > 8 && yearOld < 13) {
            return true;
        }
    }
    return false;
}

function LoginInfoCheck(userName, password){    
    /*Using the elements from the Login Webpage*/ 
    const user = playerRegistrationData[userName.trim()];

    if (!user) {//Validates if user exists.
        console.log("User not found!");
        return false;
    }

    if (user.password === password.trim()) {//Validates if passwords match.
        console.log("User found!");
        return true;
    }
    return false;//Password not matched.
};
function RegisterInfoCheck(userName){    
    /*Using the elements from the Register Webpage*/ 
    console.log(playerRegistrationData);
    return !!playerRegistrationData[userName.trim()];//Returns a boolean value if object is undefined. or not found
};

function Register(event) {
    if (event){event.preventDefault();}

    flag = RegisterInfoCheck(getRegisteredUsername().value);
    console.log(flag);//User exists: true.

    if (flag){
        window.alert("Registration attempt failed. \nThis user already exists, please login!"); 
        LoginPage();
    }
    else{
        StoreUserRegistration();
        UpdateAllCharts();
        window.alert("Registration successful!"); 
        startGameBtn.style.display = "inline-block";
        window.confirm("Welcome to our Math Quizlet\nTo play press the start button\nOnce the game has started, enter the answer you think is correct in the input box provided.\nEnjoy!");
        loggedInUser = getRegisteredUsername().value;
        console.log("The logged in user: ", loggedInUser);
        IconClose()

        if(numberOfUser > 1){
            CurrentPlayerProgressBar();
        }
    }
}

function UserLogin(event){
    if (event){event.preventDefault();}

    flag = LoginInfoCheck(getUsername().value, getLoginPassword().value);
    console.log(flag);//User exists: true.

    if (flag){
        window.alert("Log on successful!\nPlease Continue to Start the game."); 
        console.log("A match found!");
        startGameBtn.style.display = "inline-block";
        window.confirm("Welcome to our Math Quizlet\nTo play press the start button\nOnce the game has started, enter the answer you think is correct in the input box provided.\nEnjoy!");
        loggedInUser = getUsername().value;
        console.log("The logged in user: ", loggedInUser)
        IconClose()
    }else if(!flag){
        window.alert("User not found!\nPlease register."); 
        RegisterPage();
    }
}

/*We store the users data using this function*/
function StoreUserRegistration(){
    /*Note: In the console, Only the gender value is read. 
    Please check the values of the other variables to store. */  
    
    /*Using the data from the Registration Webpage*/
    loggedInUser = getRegisteredUsername().value, numberOfUser++;   

    playerRegistrationData[loggedInUser] = {
        firstName: getFirstName().value, 
        lastName: getLastName().value,
        dob: getRegisteredDOB().value,
        gender: getSexType(),
        email: getEmail().value,
        password: getRegisteredPassword().value,
        correctAns: 0,
        incorrectAns: 0,
        id: numberOfUser
    };//User info 
    console.log(playerRegistrationData);
};

function CurrentPlayerProgressBar(){
    // if(progress){
    //     progress.remove();
    // }
    // if(loggedInTag){
    //     loggedInTag.remove();
    // }

    progressArea.innerHTML = "";
    // loggedInTag = document.createElement('h3');
    loggedInTag.innerText = loggedInUser;

    FindPercentageScore();//Fills progress bar accordingly. 
    progressWrapper.appendChild(loggedInTag);
    progressWrapper.appendChild(progress);
    progressArea.append(progressWrapper);
    // progressArea.appendChild();

}

/*This function fires when the User clicks the submit button and validates the answer*/
function CheckAnswer(){
    let correctAns;
    var userAns;

    if (userAnswer.value === "") {//Ensures user inputs is not empty.
        alert("Please enter an answer!");
        return;
    }

    submitAnswer.disabled = true;

    switch (currentMathSymbol) {//Determines the question answer.
        case "addition":
            correctAns = int1 + int2; //Calculation
            break;
        case "subtraction":
            correctAns = int1 - int2; //Calculation
            break;
        case "division":
            correctAns = int1 / int2; //Calculation
            break;
        default:
                correctAns = int1* int2; //Calculation
            break;
    }

    userAns = Number(userAnswer.value);//Ensures user input is a number
    
    answerArea.style.display =  "flex";//Display Answer
    ShowNum(answerArea, correctAns);/*Feature to display the correct answer.*/    

    if(userAns === correctAns){//Validates the answer to correct
        //window.alert("the user entered the correct answer");
        playerRegistrationData[loggedInUser].correctAns += 1;
        answerArea.style.backgroundColor = "rgb(124, 203, 110)";
    }
    else{//Validates the answer to incorrect
        //window.alert("That was the wrong number"+"\n"+"the correct answer is "+ correctAns +"\n"+"the user answer is " + userAns);
        playerRegistrationData[loggedInUser].incorrectAns += 1;
        answerArea.style.backgroundColor = "rgb(203, 110, 126)";
    }

    ShowAllStats();
    CurrentPlayerProgressBar();
    UpdateAllCharts();//Live update the charts
}

/*This function Generates the random numbers*/
function GetRandomInt(max) {//Fires to generate new digit.
    return Math.floor(Math.random() * max);
}

/*The play game function fire the Generates number function and displays them on the field*/
function PlayGame(){
    let tempDigitImg, tempDigitImg2;

    //Disables and reset answer display
    answerArea.style.display = "none";
    answerArea.innerHTML =  "";
    answerArea.style.backgroundColor = "transparent";

    submitAnswer.disabled = false;
    userAnswer.value = "";//Clears user input for new question.

    currentMathSymbol = GenerateMathOperator();
    operation.src="../Assets/Image/Symbols/" + currentMathSymbol + "Symbol.png";//Applies current question operation symbol.

    // Multiplication
    do {//Ensures no two digit are both zeros (0 x 0).
        tempDigitImg = GetRandomInt(10);
        tempDigitImg2 = GetRandomInt(10);
    } while (tempDigitImg === 0 && tempDigitImg2 === 0);
    
    if (currentMathSymbol === 'division') {
        tempDigitImg2 = GetRandomInt(9) + 1;//Ensures the dividend is not 0;
        tempDigitImg = tempDigitImg * tempDigitImg2;
    } 
    else if (currentMathSymbol === 'subtraction') {
        if (tempDigitImg < tempDigitImg2) {
            [tempDigitImg, tempDigitImg2] = [tempDigitImg2, tempDigitImg];//Swap integer places.
        }
    }

    int1 = tempDigitImg;
    int2 = tempDigitImg2;

    ShowNum(digit1, int1);
    ShowNum(digit2, int2);
}

function GenerateMathOperator(){//Fires to generate and return operator.
    const operator = ["multiplication","addition", "subtraction", "division"];
    return operator[Math.floor(Math.random() * operator.length)];//Dynamically generates the operator from the array.
}

function ShowNum(container, number){//Fires to properly display number to user interface.
    const digits = number.toString().split("");//Converts the answer into individual numeral place digits.
    container.innerHTML = "";//Clears area for new content.
    
    digits.forEach(digit => {//Fires to dynamically assign image and display it.
        const image = document.createElement("img");//Creates a new element of img for each digit place.
        
        if(digit === "-"){
            image.src = "../Assets/Image/Symbols/subtractionSymbol.jpg";
        }else{
            image.src = "../Assets/Image/Numbers/Image" + digit + ".jpg";
        }
        // image.style.display = "inline-block";
        container.appendChild(image);
    });
}

function StorePercentage(score){//Determines where each data is populated.
    if(score < 50){
        amtOfUsers[0]++;
    }
    else if(score >= 50 && score <= 59){
        amtOfUsers[1]++;
    }
    else if(score >= 60 && score <= 69){
        amtOfUsers[2]++;
    }
    else if(score >= 70 && score <= 79){
        amtOfUsers[3]++;
    }
    else if(score >= 80 && score <= 89){
        amtOfUsers[4]++;
    }
    else if(score >= 90 && score <= 100){
        amtOfUsers[5]++;
    }
}

function FindPercentageScore(){
    var percentageScore, percentageScoreCalculations;
    const progressDone = document.createElement('div'), percentAmt = document.createElement('p');

    percentageScoreCalculations = (playerRegistrationData[loggedInUser].correctAns + playerRegistrationData[loggedInUser].incorrectAns);
    
    if (percentageScoreCalculations > 0) {
        percentageScore = Math.ceil((playerRegistrationData[loggedInUser].correctAns / percentageScoreCalculations) * 100);
    }else{
        percentageScore = 0;
    }

    progress.setAttribute('id', 'progress');
    progressDone.setAttribute('id', 'progressDone');
    progress.innerHTML = "";
    progress.appendChild(progressDone);

    progressDone.style.width = `${percentageScore}%`;
    percentAmt.innerHTML = `${percentageScore}%`;
    progressDone.appendChild(percentAmt);    
}

function CalculatePercentageScore(){//Fires to display the percentage score of each registered player.
    var rowHeader;
    amtOfUsers = [0, 0, 0, 0, 0, 0 ]; //Used to reset chart values.
    currentPercentArr = [0,0,0,0,0,0]; //Used to reset chart values.

    console.log("The find score is called");
    table.innerHTML = "";//Clears data in table.

    rowHeader = table.insertRow();//Insert new header for updated contents.

    //Applying the <td> element text node with the contents.
    ["First Name", "Last Name", "Percentage score", "Correct answers", "Incorrect answers"].forEach(text => {//Fires to dynamically create table headers from each text label
        let cell = rowHeader.insertCell();
        cell.textContent = text;
    })

    for (let key in playerRegistrationData) {
        let player = playerRegistrationData[key];//Player info
        let row = table.insertRow(); // table row creation
        let total = player.correctAns + player.incorrectAns;
        let percentageScore = total > 0 ? (player.correctAns/ total) * 100: 0 ;

        /*Populates the created row with the data */
        row.insertCell().textContent = player.firstName;
        row.insertCell().textContent = player.lastName;
        row.insertCell().textContent = percentageScore.toFixed(2) + "%";
        row.insertCell().textContent = player.correctAns;
        row.insertCell().textContent = player.incorrectAns;

        StorePercentage(percentageScore);//Store updated array data.
        StoreCurrentPercent(percentageScore);//Store updated array data.
    }
    percentScoreArea.appendChild(table);
}

function StoreCurrentPercent(score){
    if(score < 50){
        currentPercentArr[0]++;
    }
    else if(score >= 50 && score <= 59){
        currentPercentArr[1]++;
    }
    else if(score >= 60 && score <= 69){
        currentPercentArr[2]++;
    }
    else if(score >= 70 && score <= 79){
        currentPercentArr[3]++;
    }
    else if(score >= 80 && score <= 89){
        currentPercentArr[4]++;
    }
    else if(score >= 90 && score <= 100){
        currentPercentArr[5]++;
    }

    lastLoggedInUser = loggedInUser
    last_score = score
}

function ShowAllStats(){//Fires to dynamically display all players data on a new card. 
    showAllPlayerArea.innerHTML = "";//Removes already created content for updated content..
    let player, card = document.createElement("div"), percentage;

    for (let key in playerRegistrationData) {
        player = playerRegistrationData[key];
        console.log(playerRegistrationData[key]);
        percentage = 0;
        
        if ((player.correctAns + player.incorrectAns) > 0) {
            percentage = (player.correctAns / (player.correctAns + player.incorrectAns)) * 100; //Calculates the percentage final score.
        }
        //Creates a new area for the player data content.
        card.innerHTML = 
        `<strong>
            ${player.firstName}  ${player.lastName}
        </strong>
        <br>
        Score:${percentage.toFixed(2)}%
        Correct:${player.correctAns}
        <br>
        Incorrect:${player.incorrectAns}`;

        showAllPlayerArea.appendChild(card);//Applies player contents to the show player area
    }
}

function StartGame(){
    if (!loggedInUser) {alert("Please Logon!"); return;}//Fires to prompt Login Authentication.
    startGameBtn.style.display = "none";
    playArea.style.display = " flex";

    document.getElementById("gameArea").scrollIntoView({behavior: "smooth"});
    PlayGame();
}

function EndGame(){
    playArea.style.display = "none";//Disables play area.
    loggedInUser = null;//Signs out current user.

    console.log(loggedInUser + " ended their game.");
    CalculatePercentageScore();
    UpdateAllCharts();
}

function CurrentPercentFrequency(){
    var placeCurrentChartPercent = document.createElement('canvas');
    const data = {
        labels: percentArr,
        datasets: [{
            data: currentPercentArr,
            backgroundColor: 'rgba(83, 98, 211, 0.8)'
        }]
    },
    scales = {
        x:{
            ticks:{
                color: 'whitesmoke'
            }
        },
        y:{
            ticks:{
                color: 'whitesmoke'
            }
        }
    },
    config = {
        type: 'bar',
        data: data,
        options: {
            scales,
            plugins:{
                legend:{
                    labels:{
                        color: 'whitesmoke'
                    },
                    display: false
                },
                title: {
                    display: true,
                    text: 'Current Percent Frequency',
                    color: 'whitesmoke',
                }
            }
        }
    };

    if (!chart3) {
        placeCurrentChartPercent.id ='currentPercentFrequency';    
        currentPercentChartElement.innerHTML = "";
        currentPercentChartElement.appendChild(placeCurrentChartPercent);

        chart3 = new Chart(
            placeCurrentChartPercent,
            config
        );
    }else{
        chart3.data.datasets[0].data = currentPercentArr;
        chart3.update();
    }
}

function PercentFrequency(){
    var placeChartPercent = document.createElement('canvas');

    const data = {
        labels: percentArr,
        datasets: [{
            data: amtOfUsers,
            backgroundColor: 'rgba(83, 98, 211, 0.8)'
        }]
    },
    scales = {
        x:{
            ticks:{
                color: 'whitesmoke',
            }
        },
        y:{
            ticks:{
                color: 'whitesmoke',
            }
        }
    },
    config = {
        type: 'bar',
        data: data,
        options: {
            // responsive: true,
            scales,
            plugins:{                    
                legend:{
                    labels:{
                        color: 'whitesmoke',
                    },
                    display: false
                },
                title: {
                    display: true,
                    text: 'Percent Frequency',
                    color: 'whitesmoke',
                }
            }
        }
    };
    
    if (!chart2) {
        placeChartPercent.setAttribute('id', 'percentFrequency');
        percentChartElement.innerHTML = "";
        percentChartElement.appendChild(placeChartPercent);

        chart2 = new Chart(
            placeChartPercent,
            config
        );
    }else{
        chart2.data.datasets[0].data = amtOfUsers;
        chart2.update();
    }   
}

function GenderFrequency(male, female){
    var placeChartGender = document.createElement('canvas'), labels = ['Boy', 'Girl'], dataValues = [male, female];
    const data = {
        labels: labels,
        datasets: [{
            data: dataValues,
            backgroundColor: 'rgba(83, 98, 211, 0.8)'
        }]
    }, scales = {
        x:{
            ticks:{
                color: 'whitesmoke',
            }
        },
        y:{
            ticks:{
                color: 'whitesmoke',
            }
        }
    },
    config = {
        type: 'bar',
        data: data,
        options: {
            // responsive: true,    
            scales,
            plugins:{
                legend:{
                    labels:{
                        color: 'whitesmoke',
                    },
                    display: false
                },
                title: {
                    display: true,
                    text: 'Gender Frequency',
                    color: 'whitesmoke',
                }
            }
        }
    };

    if (!chart1) {
        placeChartGender.setAttribute('id', 'genderFrequency');
        genderChartElement.innerHTML = "";
        genderChartElement.appendChild(placeChartGender);

        chart1= new Chart(
            placeChartGender,
            config
        );
    }else{
        chart1.data.datasets[0].data = dataValues;
        chart1.update();
    }
}

function CountGender(){
    var male = 0, female = 0;

    for (let key in playerRegistrationData) {
        if(playerRegistrationData[key].gender === "Male"){
            male++
        }
        else if (playerRegistrationData[key].gender === "Female"){
            female++
        }
        else{
            console.log('No data to count.');
        }
    }
    GenderFrequency(male, female);    
}

/* Animate icons- rotate as they move from top to bottom  */
icons.forEach(icon =>{
    let size = 50, x = Math.random() *(window.innerWidth - size),  y = Math.random() *(window.innerHeight - size),
    dx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1), dy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);//calculates to randomized direction and speed.

    icon.style.left = x + "px";
    icon.style.top = y + "px";

    function Animate() {//Fires to Animate background icons.
        x += dx;
        y += dy;

        if(x <= 0 || x + size >= window.innerWidth ){//Validates if icons interact with Right or Left Walls
            dx *= -1;
        }
        if(y <= 0 || y + size >= window.innerHeight ){//Validates if icons interact with top or bottom Walls
            dy *= -1;
        }

        icon.style.left = x + "px";
        icon.style.top = y + "px";
        icon.style.transform = `rotate(${x + y}deg)`;

        requestAnimationFrame(Animate);//Applies the animation per frame.
    }
    Animate();
})

function ValidateLogin(){//Fires to Validate Login input
    const username = getUsername().value, 
    pass = getLoginPassword().value,
    loginBtn = document.getElementById('loginBtn');
    isValid = username.trim().length >= 3 && pass.trim().length >= 5;//Validates user input to display button.
    loginBtn.disabled = !isValid;//Enables button
}
function ValidateRegister(){//Fires to Validate register input
    const firstName = getFirstName().value, 
    lastName = getLastName().value, 
    gender = getSexType(),
    username = getRegisteredUsername().value,
    pass = getRegisteredPassword().value,
    registerBtn = document.getElementById('registerBtn');
    
    isValid = firstName.trim().length >= 3 && lastName.trim().length >= 3 && IsEmailValid() &&  IsDOBValid() && gender !== "" && username.trim().length >= 3 && pass.trim().length >= 5 ;//Validates user input to display button.
    registerBtn.disabled = !isValid;//Enables button
}

document.addEventListener("DOMContentLoaded", () =>{//Fires to validate input at input change,
    /*Login Page */
    getUsername().addEventListener("input", ValidateLogin), 
    getLoginPassword().addEventListener("input", ValidateLogin), 

    /*Register Page*/
    getFirstName().addEventListener("input", ValidateRegister), 
    getLastName().addEventListener("input", ValidateRegister), 
    getEmail().addEventListener("input", 
        // ValidateEmail();//Applies at email change
        ValidateRegister//Enables button.
    ),
    getRegisteredDOB().addEventListener("change", ValidateRegister),
    getGender().forEach(radio => {//Fires to apply the Event Listener to each of gender type radio buttons
        radio.addEventListener("change", ValidateRegister);
    }),
    getRegisteredUsername().addEventListener("input", ValidateRegister),
    getRegisteredPassword().addEventListener("input", ValidateRegister)

    if(numberOfUser > 1){
        CurrentPlayerProgressBar();
    }
})
window.addEventListener("load", SetCurrentYear);

function ShowPass(keyId, iconId){//Fires to display password input
    const key = document.getElementById(keyId), 
    icon = document.getElementById(iconId);
    
    if (key.type === "password"){
        key.type = "text"; 
        icon.classList.replace('bx-show', 'bx-hide');//Change toggle Icon
    }else{
        key.type = "password";
        icon.classList.replace('bx-hide', 'bx-show');//Change toggle Icon
    } 
}

function UpdateAllCharts(){//Fires at to update chart data's.
    CalculatePercentageScore();
    CountGender();
    PercentFrequency();
    CurrentPercentFrequency();
}
function SetCurrentYear(){
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();//Keeps page publish year up-to-date.
    }
}
