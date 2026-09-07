let distance = 0 // distance in km
let totalPrice = 0

const basePoint = document.getElementById("basePoint");
const destinationPoint = document.getElementById("destinationPoint");
const pricePerMile = document.getElementById("pricePerMile");
const isReturnTrip = document.getElementById("isReturnTrip");
const calculateButton = document.getElementById("calculateButton");
const resultText = document.getElementById("resultText");
const returnTripText = document.getElementById("returnTripText");
const distanceText = document.getElementById("distanceText");

calculateButton.addEventListener("click", calculate);


async function calculate() {
    let price = Number(pricePerMile.value);

    if (!basePoint.value || !destinationPoint.value) {
        resultText.textContent = "Vänligen ange både startpunkt och destination.";
        return;
    }

    if (!price || price <= 0) {
        resultText.textContent = "Vänligen ange ett giltigt pris per mil.";
        return;
    }

    const response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            start: basePoint.value,
            destination: destinationPoint.value
        })
    });

    const data = await response.json();

    console.log("Distance:", data.distanceKm);

    console.log(data);

    distance = data.distanceKm;

    let multiplier = isReturnTrip.checked ? 2 : 1;
    if (isReturnTrip.checked) {
        returnTripText.textContent = "Ja";
    } else {
        returnTripText.textContent = "Nej";
    }

    totalPrice = (distance / 10) * price * multiplier;

    resultText.textContent = `${totalPrice.toFixed(2)} kr`;
    distanceText.textContent = `${distance.toFixed(2)} km`;
}
