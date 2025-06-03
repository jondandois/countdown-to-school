 // Set the target date
 const targetDate = new Date("August 25, 2025 07:30:00");

 // Add custom excluded days (yyyy-mm-dd format)
 const excludedDates = [
     "2025-07-04", // Independence Day
 ];

 // Helper to format a Date to yyyy-mm-dd
 function formatDate(date) {
     return date.toISOString().split('T')[0];
 }

 // Calculate number of business days between now and targetDate
 function calculateBusinessDays(now, endDate, excluded) {
     let count = 0;
     let current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
     while (current < endDate) {
         const day = current.getDay();
         const formatted = formatDate(current);
         if (day !== 0 && day !== 6 && !excluded.includes(formatted)) {
             count++;
         }
         current.setDate(current.getDate() + 1);
     }
     return count;
 }

 // Update every second
 const countdownInterval = setInterval(function () {
     const now = new Date();
     const timeRemaining = targetDate.getTime() - now.getTime();

     if (timeRemaining < 0) {
         clearInterval(countdownInterval);
         document.getElementById("countdown-timer").innerHTML = "Countdown Complete!";
         return;
     }

     const businessDays = calculateBusinessDays(now, targetDate, excludedDates);

     const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

     document.getElementById("countdown-timer").innerHTML =
         `${businessDays} week days ${hours}h ${minutes}m ${seconds}s`;
 }, 1000);

 // Show/hide the off days window
 function toggleOffDays() {
     const windowDiv = document.getElementById("offDaysWindow");
     if (windowDiv.style.display === "none" || windowDiv.style.display === "") {
         const listEl = document.getElementById("offDaysList");
         listEl.innerHTML = ""; // clear previous
         excludedDates.forEach(date => {
             const li = document.createElement("li");
             li.textContent = date;
             listEl.appendChild(li);
         });
         windowDiv.style.display = "block";
     } else {
         windowDiv.style.display = "none";
     }
 }
 