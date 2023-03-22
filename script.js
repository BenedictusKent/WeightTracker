const getWeekDate = function () {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        text = `${today.getMonth() + 1}/${today.getDate()}`;
        dates.splice(0, 0, text);
        today.setDate(today.getDate() - 1);
    }
    return dates;
};

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
