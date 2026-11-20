let intake = 1750;
let goal = 2275;

// UPDATE DASHBOARD
function updateDashboard() {
    let percent = Math.min(100, Math.round((intake / goal) * 100));
    let remaining = Math.max(0, goal - intake);

    document.getElementById("todayIntake").innerText =
        intake + " ml";

    document.getElementById("intake").innerText =
        intake + " ml";

    document.getElementById("dailyGoal").innerText =
        goal + " ml";

    document.getElementById("remaining").innerText =
        remaining + " ml remaining";

    document.getElementById("percentage").innerText =
        percent + "%";

    document.getElementById("waterProgress").style.width =
        percent + "%";
}

// ADD WATER
function addWater(amount) {
    intake += amount;
    updateDashboard();

    document.getElementById("message").innerText =
        amount + " ml water added successfully! 💧";
}

// QUICK WATER LOGGING
function logWater() {
    let amount = Number(
        document.getElementById("waterAmount").value
    );

    if (amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter a valid water amount!");
        return;
    }

    addWater(amount);

    document.getElementById("waterAmount").value = "";
}

// START HYDRATING
function startHydrating() {
    document.getElementById("hydration").scrollIntoView({
        behavior: "smooth"
    });
}

// DAILY GOAL CALCULATOR
function calculateGoal() {
    let weight = Number(
        document.getElementById("weight").value
    );

    if (weight <= 0 || !Number.isFinite(weight)) {
        alert("Please enter your weight!");
        return;
    }

    goal = Math.round(weight * 35);

    document.getElementById("recommendation").innerText =
        "💧 Recommended: " + goal + " ml/day";

    updateDashboard();
}

// LOG COFFEE
function logCoffee() {
    goal += 200;

    document.getElementById("recommendation").innerText =
        "💧 Updated target: " + goal + " ml/day";

    updateDashboard();

    alert("Coffee logged! Your water target increased by 200 ml.");
}

// CREATE TEAM
function createTeam() {
    let teamName = prompt("Enter your team name:");

    if (teamName && teamName.trim() !== "") {
        document.querySelector(".squad-banner h3").innerText =
            "👑 " + teamName;

        alert("Your team was created successfully!");
    }
}

// HYDRATION REMINDER
function enableReminder() {
    if (!("Notification" in window)) {
        alert("Notifications are not supported in this browser.");
        return;
    }

    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            document.getElementById("reminderMessage").innerText =
                "Reminders enabled successfully! 💧";

            new Notification("HydroHeroHunt", {
                body: "Time to drink water! Stay hydrated."
            });
        } else {
            document.getElementById("reminderMessage").innerText =
                "Please allow notifications in browser settings.";
        }
    });
}

// NAVIGATION
document.querySelectorAll("nav a").forEach(function(link) {
    link.addEventListener("click", function() {
        document.querySelectorAll("nav a").forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// INITIAL UPDATE
updateDashboard();