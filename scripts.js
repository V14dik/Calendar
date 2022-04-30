let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date_from.min = new Date().toISOString().split("T")[0];
date_till.min = new Date().toISOString().split("T")[0];
date_from.onchange = ({target: { value} }) => {
    date_till.setAttribute("min", value || new Date().toISOString().split("T")[0]);
};

let calendarHeader = document.getElementById("calendar-header");
showMonthCalendar(currentMonth, currentYear, false);

var Nowdate=new Date();  
var WeekFirstDay=new Date(Nowdate-(Nowdate.getDay())*86400000);
var WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
console.log(currentMonth);

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
    console.log(start);
    let tableHeader = start.getDate() + start.getMonth();
    console.log(tableHeader); 
    /*calendarHeader.innerHTML = "";
    console.log(start.toISOString().split("T")[0]);
    calendarHeader.innerHTML = start.toISOString().split("T")[0].split("-")[2];*/

    let tbl = document.getElementById("week-body");
    tbl.innerHTML = "";
    for(let i = 0; i< 24; i++){
        let row = document.createElement("tr");
        let hourCell = document.createElement("td");
        hourCell.innerHTML = i + ':00';
        row.appendChild(hourCell);

        for(let j = 0; j < 7; j++){
            let cell = document.createElement("td");
            cell.classList.add("week-table-body-cell");
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
    
}

function showMonthCalendar(month, year, flag = false) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = null;
    if (flag == true){
        tbl = document.createElement("tbody");
    }
    else {
        tbl = document.getElementById("calendar-body");
    }


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
                cell.classList.add("month-td");
                let cellContent = document.createElement("div");
                cellContent.classList.add('calendar-cell');
                let cellText = document.createElement('span');
                cellText.innerHTML = date;
                cellText.classList.add('cell-number');
                cellContent.appendChild(cellText);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("calendar-event-td");
                    cellContent.classList.add("calendar-event-cell");
                    let eventName = document.createElement('span');
                    eventName.innerHTML = 'Meeting';
                    cellContent.appendChild(eventName);
                    let time = document.createElement("span");
                    time.innerHTML = '10:00 - 11:00';
                    time.classList.add("event-time");
                    cellContent.appendChild(time);
                } // color today's date
                cell.appendChild(cellContent);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }
    return tbl;

}

function showYearCalendar(year) {
    let yearTable = document.getElementById("year_table");
    months.forEach(month => {
        let monthContainer = document.createElement("div");
        let monthName = document.createElement("span");
        monthName.innerHTML = month;
        monthName.classList.add("month-name");
        monthContainer.appendChild(monthName);
        let tableHead = document.getElementById("month_thead")
        let tH = tableHead.cloneNode(true);
        let monthInYearTable = document.createElement("table");
        tH.classList.add("calendar-head");
        monthInYearTable.appendChild(tH);
        monthInYearTable.appendChild(showMonthCalendar(months.indexOf(month), year, true));
        monthInYearTable.classList.add("month-in-year-table");
        monthContainer.appendChild(monthInYearTable);
        monthContainer.classList.add("month-container");
        yearTable.appendChild(monthContainer);

    })
    calendarHeader.innerHTML = " " + year;
}

function onButtonClick(type) {
    const [week, month, year] = document.querySelectorAll(".nav-button");
    const pressed = "nav-button--pressed";
    const nonActive = "days-non-active";
    const weekTable = document.getElementById("week_table");
    const monthTable = document.getElementById("month_table");
    const yearTable = document.getElementById("year_table");

    week.classList.remove(pressed);
    weekTable.classList.add(nonActive);
    month.classList.remove(pressed);
    monthTable.classList.add(nonActive);
    year.classList.remove(pressed);
    yearTable.classList.add(nonActive);
    yearTable.classList.remove("year-table");

    switch(type) {
        case "week":
            week.classList.add(pressed);
            weekTable.classList.remove(nonActive);
            showWeekCalendar(WeekFirstDay, WeekLastDay);
            break;
        case "month": 
            month.classList.add(pressed);
            monthTable.classList.remove(nonActive);
            showMonthCalendar(currentMonth, currentYear, false);
            break;
        case "year":
            year.classList.add(pressed);
            yearTable.classList.remove(nonActive);
            yearTable.classList.add("year-table");
            showYearCalendar(currentYear);
            break;
    }
    
}
