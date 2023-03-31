// variables of alarm
const selectValues = $('#alarm-values select').children(); // first child options of select
const timeValues = $("#alarm-values select"); // time values -< hour min sec
const form = $('#alarm-values');
const list = $('#list');
const delButton = $('#list input');
const alarmList = [];

// setting option values in form
function setValues() {
    for (let i = 0; i <= 12; i++) {
        const option = `<option value="${i}">${i}</option>`;
        $(selectValues[0]).after(option);
    }

    for (let i = 0; i <= 59; i++) {
        const minute = i < 10 ? `0${i}` : i;
        const option = `<option value="${minute}">${minute}</option>`;
        $(selectValues[1]).after(option);
        $(selectValues[2]).after(option);
    }

    for (let i = 0; i <= 1; i++) {
        const amPm = i == 0 ? "PM" : "AM";
        const option = `<option value="${amPm}">${amPm}</option>`;
        $(selectValues[3]).after(option);
    }
}

setValues();

// contains list of alarm
$("#set-alarm-button").click(function(e) {
    // fetching option values for which alarm is to be set
    const hour = $(timeValues[0]).val();
    const minute = $(timeValues[1]).val();
    const second = $(timeValues[2]).val();
    const amPm = $(timeValues[3]).val();

    // validating alarm time
    if (hour === "Hour" || minute === "Min" || second === "Sec" || amPm === "AM/PM") {
        window.alert("Invalid values");
        return;
    }

    // pushing alarm to alarmList
    const alarmTime = `${hour}:${minute}:${second} ${amPm}`;
    alarmList.push(alarmTime);
    render();
    form[0].reset();
});

function render() {
    // rendering alarmList
    list.empty();
    alarmList.forEach((alarm, i) => addToDOM(alarm, i));
}

function addToDOM(alarm, i) {
    // displaying alarmList values
    const listItem = $(`<li>
    <span>${alarm} </span>
    <input type="button" value="Delete" id=${i} onClick="Delete(${i})">
    </li>`);
    list.append(listItem);
}

// element for current-time
function ctime() {
    const currentTime = new Date().toLocaleTimeString('en-US');
    $(`#ctime`).text(currentTime);

    // checking if it's time for any alarm
    for (let i = 0; i < alarmList.length; i++) {
        if (alarmList[i] === currentTime) {
            window.alert("Wake Up!");
            Delete(i);
            render();
        }
    }
}

// delete function
function Delete(id) {
    alarmList.splice(id, 1);
    render();
}

// interval setting
setInterval(ctime, 1000);