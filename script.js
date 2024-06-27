let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const change = document.getElementById("change-due");
const totalPrice = document.getElementById("total-price");
const changeInDrawer = document.getElementById("change-in-drawer");
const changeDue = document.getElementById("change-due");

const checkInput = () => {
    if (cash.value < price) {
        alert("Customer does not have enough money to purhcase the item")
    } else if (Number(cash.value) === price) {
        console.log(cash.value);
        changeDue.innerText = "No change due - customer paid with exact cash"
    } else {
        console.log("No case");
    }
}

totalPrice.innerText = `Total: $${price}`;
changeInDrawer.innerText = `Change in drawer: ${cid}`

purchaseBtn.addEventListener("click",checkInput);