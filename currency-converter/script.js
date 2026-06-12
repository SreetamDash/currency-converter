const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", convertCurrency);

async function convertCurrency() {

    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount <= 0 || isNaN(amount)) {
        result.innerHTML = "Please enter a valid amount.";
        return;
    }

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        const rate = data.rates[to];

        const convertedAmount = (amount * rate).toFixed(2);

        result.innerHTML =
            `${amount} ${from} = ${convertedAmount} ${to}`;

    } catch (error) {

        result.innerHTML = "Failed to fetch exchange rate.";

        console.error(error);
    }
}