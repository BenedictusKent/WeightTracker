// Change button text on click & open footer window
const logButton = document.querySelector("button");
let isClicked = false;
logButton.addEventListener("click", function () {
    isClicked = !isClicked;
    const footer = document.querySelector("footer");
    if (isClicked) logButton.textContent = "CLOSE WINDOW";
    else logButton.textContent = "LOG WEIGHT";
    footer.classList.toggle("show");
});

// Change footer date to today's date
const changeFooterDate = function () {
    const today = new Date();
    const dateFormat = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate()}`;
    document.getElementById("calendar").value = dateFormat;
};
changeFooterDate();

// Get form data
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", function () {
    const dateInput = document.getElementById("calendar");
    const weightInput = document.getElementById("weight");
    // TODO: Insert data to DB
});

// Output 7-day dates counting back from today
const getWeekDate = function () {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
        text = `${today.getMonth() + 1}/${today.getDate()}`;
        dates.splice(0, 0, text);
        today.setDate(today.getDate() - 1);
    }
    return dates;
};

// Chart.js
const ctx = document.getElementById("myChart");

Chart.defaults.font.size = 16;
Chart.defaults.font.family = "Helvetica";
Chart.defaults.color = "#000";

new Chart(ctx, {
    type: "line",
    data: {
        labels: getWeekDate(),
        datasets: [
            {
                label: "Weight in kg",
                data: [78.9, 78.25, 77.65, 78.8, 78.1, 79, 78.3],
                borderWidth: 2,
                borderColor: "#3ebc5a",
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    },
});
