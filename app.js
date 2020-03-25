/* handles the ui and the data
     combines the two to form the app
*/
const coronaData = new Corona();
const ui = new UI();

const totalUI = document.querySelector(".total");
const loader = document.querySelector(".loader");
const alert = document.querySelector(".alert");
const world = document.querySelector(".worldData");
const countryInput = document.querySelector("#country");
const submit = document.querySelector("#submit");
const ctx = document.getElementById("myChart").getContext("2d");

loader.style.display = "none";

function total() {
    loader.style.display = "block";
    const totalData = coronaData.getTotal().then(function(data) {
        ui.showTotal(data);
        loader.style.display = "none";
    });
}
total();

world.addEventListener("click", function() {
    const totalData = coronaData
        .getTotal()
        .then(function(data) {
            ui.showTotal(data);
            loader.style.display = "none";
        })
        .catch(err => {
            console.log(err);
        });
});

submit.addEventListener("click", function(e) {
    e.preventDefault();
    loader.style.display = "block";
    totalUI.style.display = "none";
    const country = countryInput.value;
    ui.clearData();

    if (countryInput.value === "") {
        // send an alert
        loader.style.display = "none";
        totalUI.style.display = "block";
        setTimeout(alert => {
            document.querySelector(".alert").remove();
        }, 4000);
        ui.showAlert("Input Empty", "alert-danger");
    } else {
        // display the stats

        const data = coronaData.getData(country).then(function(data) {
            if (!data.data.error) {
                // show data
                ui.showData(data.data, country);
                console.log(data.data.confirmed.value);

                const chart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Confirmed Cases", "Recovered", "Deaths"],
                        datasets: [{
                            label: `Graph of corona cases in ${country}`,
                            data: [
                                data.data.confirmed.value,
                                data.data.recovered.value,
                                data.data.deaths.value
                            ],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.8)",
                                "rgba(54, 162, 235, 0.8)",
                                "rgba(255, 206, 86, 0.8)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)"
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        legend: { postion: "bottom" }
                    }
                });
                loader.style.display = "none";
                document.getElementById("myChart").style.display = "block";
            } else {
                // show alert
                setTimeout(function() {
                    document.querySelector(".alert").remove();
                }, 4000);
                ui.showAlert(`${country} not found in Database`, "alert-danger");
                document.getElementById("myChart").style.display = "none";
                totalUI.style.display = "block";
                loader.style.display = "none";
            }
        });

        countryInput.value = null;
    }
});