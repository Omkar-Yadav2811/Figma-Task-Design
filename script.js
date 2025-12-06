const cards = document.querySelectorAll(".card");
const radios = document.querySelectorAll(".radio");
const addToCartBtn = document.querySelector(".cta");

function collapseAll() {
    cards.forEach(c => {
        c.classList.remove("active");
        c.querySelector(".options").style.height = "0px";
        c.querySelector(".options").style.opacity = "0";
    });
    radios.forEach(r => r.classList.remove("checked"));
}

cards.forEach(card => {
    card.addEventListener("click", () => {
        collapseAll();

        card.classList.add("active");
        const id = card.dataset.card;

        document.querySelector(`.radio[data-radio="${id}"]`)
            .classList.add("checked");

        const opt = card.querySelector(".options");
        opt.style.height = opt.scrollHeight + "px";
        opt.style.opacity = "1";

        const price = {
            1: "$10.00 USD",
            2: "$18.00 USD",
            3: "$24.00 USD"
        };

        document.getElementById("total").textContent = "Total : " + price[id];
    });
});

// open card 2 by default
document.querySelector('.card[data-card="2"]').click();

// ADD ALERT ON CLICK
addToCartBtn.addEventListener("click", () => {
    const activeCard = document.querySelector(".card.active");
    if (!activeCard) return alert("Please select a card first!");

    const cardId = activeCard.dataset.card;
    const price = {
        1: "$10.00 USD",
        2: "$18.00 USD",
        3: "$24.00 USD"
    };

    const optionRows = activeCard.querySelectorAll(".option-row");
    let selectedOptions = [];
    optionRows.forEach((row, index) => {
        const size = row.querySelector("select:not(.color-select)").value || "None";
        const color = row.querySelector(".color-select").value || "None";
        selectedOptions.push(`#${index + 1}: Size - ${size}, Color - ${color}`);
    });

    alert(
        `✅ Added to Cart!\n\nCard ${cardId}\nPrice: ${price[cardId]}\nSelected Options:\n${selectedOptions.join("\n")}`
    );

    location.reload();
});
