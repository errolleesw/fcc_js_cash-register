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

class CashRegister {
    constructor(price, cashInDrawer) {
      this.price = price;
      this.cashInDrawer = cashInDrawer;
      this.currencyUnits = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
      };
    }
  
    calculateChange(cash) {
      let changeDue = cash - this.price;
      let totalCID = this.cashInDrawer.reduce((sum, [, amount]) => sum + amount, 0);
      
      if (changeDue > totalCID) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      }
      
      if (changeDue.toFixed(2) === totalCID.toFixed(2)) {
        return { status: "CLOSED", change: this.cashInDrawer };
      }
      
      let change = [];
      for (let i = this.cashInDrawer.length - 1; i >= 0; i--) {
        const [unit, amount] = this.cashInDrawer[i];
        const unitValue = this.currencyUnits[unit];
        let unitCount = Math.min(Math.floor(changeDue / unitValue), amount / unitValue);
        let unitTotal = unitCount * unitValue;
        
        if (unitCount > 0) {
          change.push([unit, unitTotal]);
          changeDue = (changeDue - unitTotal).toFixed(2);
        }
        
        if (changeDue == 0) break;
      }
      
      if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      }
      
      return { status: "OPEN", change };
    }
  }  
  
  const cashRegister = new CashRegister(price, cid);
  
  // Get DOM elements
  const cashInput = document.getElementById("cash");
  const purchaseBtn = document.getElementById("purchase-btn");
  const changeDue = document.getElementById("change-due");
  const totalPrice = document.getElementById("total-price");
  const changeInDrawer = document.getElementById("change-in-drawer");
  
  // Helper function to format currency
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  
  // Update display function
  const updateDisplay = () => {
    totalPrice.innerText = `Total: ${formatCurrency(price)}`;
    
    // Create table for change in drawer
    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Currency Unit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    cid.forEach(([unit, amount]) => {
      tableHTML += `
        <tr>
          <td>${unit}</td>
          <td>${formatCurrency(amount)}</td>
        </tr>
      `;
    });
    
    tableHTML += `
        </tbody>
      </table>
    `;
    
    changeInDrawer.innerHTML = `<h2>Change in Drawer:</h2>${tableHTML}`;
  };
  
  // Handle purchase function
  const handlePurchase = () => {
    const cash = parseFloat(cashInput.value);
    
    if (isNaN(cash)) {
      alert("Please enter a valid amount");
      return;
    }
    
    if (cash < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
    
    if (cash === price) {
      changeDue.innerText = "No change due - customer paid with exact cash";
      return;
    }
    
    const result = cashRegister.calculateChange(cash);
    
    if (result.status === "INSUFFICIENT_FUNDS") {
      changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
      changeDue.innerText = `Status: CLOSED ${result.change.map(([unit, amount]) => `${unit}: ${formatCurrency(amount)}`).join(' ')}`;
    } else {
      changeDue.innerText = `Status: OPEN ${result.change.map(([unit, amount]) => `${unit}: ${formatCurrency(amount)}`).join(' ')}`;
    }
  };
  
  // Initialize display
  updateDisplay();
  
  // Add event listener
  purchaseBtn.addEventListener("click", handlePurchase);