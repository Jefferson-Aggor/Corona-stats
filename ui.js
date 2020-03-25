// responsible for the rendering of the app

const formatTime = function(time) {
    return moment(time).format("MMMM do , hh:mm");
};

class UI {
    constructor() {
        this.output = document.querySelector(".output");
        this.total = document.querySelector(".total");
    }
    showTotal(info) {
        this.total.innerHTML = `
       
        <div class="grid-3">
        <div class=" card all-center" ><i class="fas fa-globe fa-3x"></i><h3 class="">${info.confirmed.value}</h3><p>Confirmed Cases Worldwide</p></div>
        <div class=" card all-center" ><img src = "download.png" style='width:65px;height:65px;margin-top:7px'><h3>${info.recovered.value}</h3><p>Recovered Patients Worldwide</p></div>
        <div class=" card all-center" ><i class="fas fa-sad-tear fa-3x"></i><h3>${info.deaths.value}</h3> <p>Deaths Recorded Worldwide</p></div>
        </div>
        `;
    }

    showData(info, country) {
        this.output.innerHTML = `
        
            <ul class="collection with-header stripe">
            <li class="collection-header"><p class="capitalize">${country}</p></li>
            <li class="collection-item"><div>Cases:<a href="#!" class="secondary-content">${
              info.confirmed.value
            }</a></div></li>
            <li class="collection-item"><div>Recovered:<a href="#!" class="secondary-content">${
              info.recovered.value
            }</a></div></li>
            <li class="collection-item"><div>Deaths<a href="#!" class="secondary-content">${
              info.deaths.value
            }</a></div></li>
            <li class="collection-item"><div>Last Update<a href="#!" class="secondary-content">${formatTime(
              info.lastUpdate
            )}</a></div></li>
        </ul>
      <div>
            
      </div>
       
        `;
    }
    showAlert(message, className) {
        this.clearAlert();
        // create a div
        const div = document.createElement("div");
        div.classList = `alert  ${className}`;
        div.appendChild(document.createTextNode(message));

        const parent = document.querySelector(".parent");
        const before = document.querySelector(".before");
        parent.insertBefore(div, before);
    }
    clearAlert() {
        const currentAlert = document.querySelector(".alert");
        if (currentAlert) {
            currentAlert.remove();
        }
    }
    clearData() {
        this.output.innerHTML = "";
    }
}