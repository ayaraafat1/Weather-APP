// !========================== Start Global Variables================//
const inputSearch = document.getElementById("inputSearch");//search input to enter city in it
const btnFind = document.querySelector(".btn-find");//button to get city's Weather
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// !========================== End Global Variables================//



// ========================== Start Events================//
btnFind.addEventListener("click", function () {
    getforecast(inputSearch.value);
});
inputSearch.addEventListener("keyup", function () {
   getforecast(inputSearch.value);
});
// ========================== End Events================//



// ?========================== Start Functions================//
getforecast("cairo");// call function and show by default cairo city

//functin to Get Data From API
async function getforecast(term) {
    loading.classList.remove("d-none")//show loading
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3d2a7500ae5745cd8be181358240912&q=${term}&days=3`
    );
    let responseData = await response.json();
  
    if (response.status >= 200 && response.status < 300) {
      let current = responseData.current;
      let location = responseData.location;
      let forecast = responseData.forecast.forecastday;
  
      displayCurrent(current, location);
      displayAnother(forecast);
    }
    loading.classList.add("d-none")//hide loading
}

// functin to display Current day
function displayCurrent(c, l) {
    let e = new Date(c.last_updated.replace(" ", "T"));
    let cartona =`
      <div class="col-lg-4">
                  <div class="card" id="today">
                     <div class="card-footer d-flex justify-content-between align-items-center rounded-top-1">
                        <span id="day" class="d-block">${days[e.getDay()]}</span>
                        <span id="date" class="d-block">${e.getDate() + months[e.getMonth()]}</span>
                     </div>
                     <div class="card-body">
                        <span id="city-today" class="d-block mt-3">${l.name}</span>
                        <h2 id="degree">${c.temp_c }<span id="char">o</span>C</h2>
                        <div class="status">
                           <img src="https:${c.condition.icon}" alt="${c.condition.text}" class="d-block w-100">
                        </div>
                        <span id="today-status" class="d-block">${c.condition.text}</span>
                        <div class="icons d-flex justify-content-between align-items-center">
                           <div class="umberella">
                                 <img src="images/icon-umberella.png" alt="umberella">
                                 <span>20%</span>
                           </div>
                           <div class="wind">
                              <img src="images/icon-wind.png" alt="wind">
                              <span>18km/h</span>
                        </div>
                        <div class="compass">
                           <img src="images/icon-compass@2x.png" alt="compass">
                           <span>East</span>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
    `
    document.getElementById("rowData").innerHTML = cartona;
}

// functin to display Another days 
function displayAnother(f) {
    let cartona = "";
    for (let i = 1; i < f.length; i++)
    {
        if(i===1)
        {
            cartona +=`
             <div class="col-lg-4">
                  <div class="card" id="tomorrow">
                     <div class="card-footer text-center rounded-top-1 tomorrow-footer">
                        <span id="next-day" class="d-block">${days[new Date(f[i].date.replace(" ", "T")).getDay()]}</span>
                     </div>
                     <div class="card-body text-center tomorrow">
                        <div class="next-status-shap  mx-auto">
                           <img src="https:${f[i].day.condition.icon }" alt="${f[i].day.condition.text}" class="w-100 d-block">
                        </div>
                        <h3 id="next-degree1">${f[i].day.maxtemp_c}<span id="char">o</span>C</h3>
                        <h4 id="next-degree2">${f[i].day.mintemp_c}<span id="char">o</span>C</h4>
                        <span id="next-status" class="d-block">${f[i].day.condition.text}</span>
                     </div>
                  </div>
               </div>
            `
        }
        else{
            cartona +=`
             <div class="col-lg-4">
                  <div class="card" id="tomorrow">
                     <div class="card-footer text-center rounded-top-1 third-footer">
                        <span id="next-day" class="d-block">${days[new Date(f[i].date.replace(" ", "T")).getDay()]}</span>
                     </div>
                     <div class="card-body text-center third">
                        <div class="next-status-shap  mx-auto">
                           <img src="https:${f[i].day.condition.icon }" alt="${f[i].day.condition.text}" class="w-100 d-block">
                        </div>
                        <h3 id="next-degree1">${f[i].day.maxtemp_c}<span id="char">o</span>C</h3>
                        <h4 id="next-degree2">${f[i].day.mintemp_c}<span id="char">o</span>C</h4>
                        <span id="next-status" class="d-block">${f[i].day.condition.text}</span>
                     </div>
                  </div>
               </div>
            `
        }
    }
    document.getElementById("rowData").innerHTML += cartona
}
// ?========================== End Functions================//
