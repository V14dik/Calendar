let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
date_from.min = new Date().toISOString().split("T")[0];
//console.log(new Date().toISOString())
date_till.min = new Date().toISOString().split("T")[0];

let calendarHeader = document.getElementById("calendar-header");
showMonthCalendar(currentMonth, currentYear);

var Nowdate=new Date();  
var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay())*86400000);
var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
showWeekCalendar(WeekFirstDay, WeekLastDay);


let menuBtn = document.querySelector('.menu-btn');
let mobileAside = document.querySelector('.mobile-aside');
let calendarContainer = document.querySelector('.calendar-container');
let calendarTable = document.querySelector('.calendar-table');
let calendarBody = document.querySelector('.calendar-body');
let mobileAsideContainer = document.querySelector('.mobile-aside-container');


menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
    mobileAsideContainer.classList.toggle('mobile-aside-container-active');
    mobileAside.classList.toggle('mobile-aside-active');
})

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showMonthCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showMonthCalendar(currentMonth, currentYear);
}

/*function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showMonthCalendar(currentMonth, currentYear);
}*/

function showWeekCalendar(start, end){
    /*console.log(start.toISOString());
    calendarHeader.innerHTML = "";
    console.log(start.toISOString().split("T")[0]);
    calendarHeader.innerHTML = start.toISOString().split("T")[0].split("-")[2];*/

    let tbl = document.getElementById("week-body");
    console.log(tbl);
    tbl.innerHTML = "";
    for(let i = 0; i< 23; i++){
        let row = document.createElement("tr");
        let hourCell = document.createElement("td");
        hourCell.innerHTML = i + ':00';
        row.appendChild(hourCell);

        for(let j = 0; j < 7; j++){
            let cell = document.createElement("td");
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
    
}

function showMonthCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";
    calendarHeader.innerHTML = months[month] + " " + year;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        if (date > daysInMonth){
            break;
        }
        let row = document.createElement("tr");


        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                //if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    //cell.classList.add("bg-info");
                    //console.log(today.getDate());
                    //console.log(date);
                //} // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function onButtonClick(type) {
    const [week, month, year] = document.querySelectorAll(".nav-button");
    const pressed = "nav-button--pressed";
    const nonActive = "days-non-active";
    const weekTable = document.getElementById("week_table");
    const monthTable = document.getElementById("month_table");

    week.classList.remove(pressed);
    weekTable.classList.add(nonActive);
    month.classList.remove(pressed);
    monthTable.classList.add(nonActive);
    year.classList.remove(pressed);

    switch(type) {
        case "week":
            week.classList.add(pressed);
            weekTable.classList.remove(nonActive);
            console.log("hjhgghgh")
            break;
        case "month": 
            month.classList.add(pressed);
            monthTable.classList.remove(nonActive);
            break;
        case "year":
            year.classList.add(pressed);
            break;
    }
    
}
