const toggleIngredients = document.getElementById("toggleIngredients");
const ingredients = document.querySelector(".ingredients");

const toggleSteps = document.getElementById("toggleSteps");
const steps = document.querySelector(".steps");

const startCooking = document.getElementById("startCooking");
const nextStep = document.getElementById("nextStep");
const progressBar = document.getElementById("progressBar");

const timerDisplay = document.getElementById("timer");
const printRecipe = document.getElementById("printRecipe");

let stepIndex = 0;
let stepItems = document.querySelectorAll(".steps li");
let timer;
let prepTime = 45; // minutes

toggleIngredients.addEventListener("click", () => {
    ingredients.classList.toggle("hidden");
    toggleIngredients.textContent = ingredients.classList.contains("hidden")
        ? "Show Ingredients" : "Hide Ingredients";
});

toggleSteps.addEventListener("click", () => {
    steps.classList.toggle("hidden");
    toggleSteps.textContent = steps.classList.contains("hidden")
        ? "Show Steps" : "Hide Steps";
});

startCooking.addEventListener("click", () => {
    stepIndex = 0;
    highlightStep();
    nextStep.disabled = false;
    startTimer(prepTime);
});

nextStep.addEventListener("click", () => {
    stepIndex++;
    highlightStep();
});

function highlightStep() {
    stepItems.forEach(item => item.style.background = "");
    if (stepIndex < stepItems.length) {
        stepItems[stepIndex].style.background = "#d7f8dc";
        progressBar.style.width = `${((stepIndex+1)/stepItems.length) * 100}%`;
    } else {
        nextStep.disabled = true;
        timerDisplay.textContent = "✅ Done!";
    }
}

function startTimer(minutes) {
    let totalSeconds = minutes * 60;
    clearInterval(timer);
    timer = setInterval(() => {
        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;
        timerDisplay.textContent = `⏳ Time left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (totalSeconds <= 0) {
            clearInterval(timer);
            timerDisplay.textContent = "⏳ Time's up!";
        }
        totalSeconds--;
    }, 1000);
}

printRecipe.addEventListener("click", () => {
    window.print();
});
