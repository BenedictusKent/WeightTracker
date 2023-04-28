// Change button text on click & open form window
const logButton = document.querySelector("button");
let isClicked = false;
logButton.addEventListener("click", function () {
    isClicked = !isClicked;
    const form = document.querySelector("form");
    if (isClicked) logButton.textContent = "CLOSE WINDOW";
    else logButton.textContent = "LOG WEIGHT";
    form.classList.toggle("show");
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

// Output 7-day dates counting back from today
const getWeekDate = function (date_data) {
    // const today = new Date();
    // const dates = [];
    // for (let i = 0; i < 7; i++) {
    //     text = `${today.getMonth() + 1}/${today.getDate()}`;
    //     dates.splice(0, 0, text);
    //     today.setDate(today.getDate() - 1);
    // }
    // return dates;

    const dates = [];
    for (let i = 0; i < date_data.length; i++) {
        const day = new Date(date_data[i]);
        text = `${day.getMonth() + 1}/${day.getDate()}`;
        dates.push(text);
    }
    return dates;
};

fetch("/data")
    .then((response) => response.json())
    .then((data) => {
        // Chart.js
        const ctx = document.getElementById("myChart");

        Chart.defaults.font.size = 16;
        Chart.defaults.font.family = "Helvetica";
        Chart.defaults.color = "#000";

        new Chart(ctx, {
            type: "line",
            data: {
                labels: getWeekDate(data.dates),
                datasets: [
                    {
                        label: "Weight in kg",
                        data: data.weight,
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
    });
