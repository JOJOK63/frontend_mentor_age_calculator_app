document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#birth-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents the form from actually submitting

    const form = e.currentTarget;
    const data = new FormData(form);
    const day = data.get("day");
    const month = data.get("month");
    const year = data.get("year");
    console.log(day, month, year);
    if (day === "" || month === "" || year === "") {
      infoAlert();
      e.preventDefault();
    } else if (!isNaN(month) && !isNaN(year) && !isNaN(year)) {
      deleteInfoAlert();
      calculateTimeOnEarth(day, month, year);
    }
  });
});

function displayTimeOnEarth(years, months, days) {
  const dayPlace = document.querySelector(".show-day");
  const monthPlace = document.querySelector(".show-month");
  const yearPlace = document.querySelector(".show-year");
  yearPlace.innerHTML = "";
  monthPlace.innerHTML = "";
  dayPlace.innerHTML = "";

  yearPlace.innerHTML = `<span>${years}</span> year${years >= 1 ? "s" : ""}`;
  monthPlace.innerHTML = `<span>${months}</span> month${
    months >= 1 ? "s" : ""
  }`;
  dayPlace.innerHTML = `<span>${days}</span> day${days >= 1 ? "s" : ""}`;
}

function calculateTimeOnEarth(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const timeDifference = currentDate - birthDate;
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24 * 365.25)) /
      (1000 * 60 * 60 * 24 * (365.25 / 12))
  );
  const days = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24 * (365.25 / 12))) /
      (1000 * 60 * 60 * 24)
  );
  displayTimeOnEarth(years, months, days);
}

function infoAlert() {
  const formulary = document.querySelectorAll(".form-group");

  formulary.forEach((element) => {
    element.classList.add("special");
    const p = document.createElement("p");
    p.innerText = "This field is required";
    element.appendChild(p);
  });
}

function deleteInfoAlert() {
  const formulary = document.querySelectorAll(".form-group");

  formulary.forEach((element) => {
    element.classList.remove("special");
    formulary.forEach((element) => {
      const p = element.querySelector("p");
      if (p) {
        element.removeChild(p);
      }
    });
  });
}
