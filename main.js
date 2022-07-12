const MINUTES = 10;

function init() {
    const panelBottomHidden = localStorage.getItem("timeHidden");
    if (panelBottomHidden === null) {
        showPanelBottom();
    } else {
        const timeHidden = new Date(panelBottomHidden);
        const expiredTime = new Date(timeHidden);
        expiredTime.setMinutes(expiredTime.getMinutes() + MINUTES);

        const now = new Date();
        if (now > expiredTime) {
            showPanelBottom();
        } else {
            const diff = expiredTime.getTime() - now.getTime();
            startCoundown(diff);
        }
    }
}
init();

function startCoundown(delay) {
    setTimeout(function () {
        showPanelBottom();
    }, delay);
}

function hidePanelTop() {
    const panelContainer = document.getElementById("panel-top");
    panelContainer.classList.add("hide");
}

function hidePanelBottom() {
    const panelContainer = document.getElementById("panel-bottom");
    panelContainer.classList.add("hide");
    const now = new Date();
    localStorage.setItem("timeHidden", now.getTime());
    startCoundown(MINUTES * 60000);
}

function showPanelBottom() {
    const panelContainer = document.getElementById("panel-bottom");
    panelContainer.classList.remove("hide");
    localStorage.removeItem("timeHidden");
}

function onSubmitForm(event) {
    event.preventDefault();
    console.log("cek value", event, event.target[0].value);
}

const form = document.getElementById("formSubscription");
form.onsubmit = onSubmitForm;
