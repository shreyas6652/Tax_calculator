import React, { useState } from "react";
import "./styles.css"; // Importing the CSS file

const TaxCalculator = () => {
  const [salary, setSalary] = useState(1275000);
  const standardDeduction = 75000;

  const taxSlabs2024 = [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 5 },
    { limit: 1000000, rate: 10 },
    { limit: 1200000, rate: 15 },
    { limit: 1500000, rate: 20 },
    { limit: Infinity, rate: 30 },
  ];

  const taxSlabs2025 = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 5 },
    { limit: 1200000, rate: 10 },
    { limit: 1600000, rate: 15 },
    { limit: 2000000, rate: 20 },
    { limit: 2400000, rate: 25 },
    { limit: Infinity, rate: 30 },
  ];
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only numbers
    if (/^\d*$/.test(value)) {
      setSalary(value);
    }
  };
  
  const calculateTax = (taxableIncome, slabs) => {
    let tax = 0;
    let previousLimit = 0;

    for (const slab of slabs) {
      if (taxableIncome > previousLimit) {
        const taxableAmount = Math.min(taxableIncome, slab.limit) - previousLimit;
        tax += (taxableAmount * slab.rate) / 100;
        previousLimit = slab.limit;
      } else {
        break;
      }
    }
    return tax;
  };

  // Calculate tax for 2024
  const taxableIncome2024 = Math.max(0, salary - standardDeduction);
  const tax2024 = taxableIncome2024 > 700000 ? calculateTax(taxableIncome2024, taxSlabs2024) : 0;
  const inHand2024 = salary - tax2024;

  // Calculate tax for 2025
  const taxableIncome2025 = Math.max(0, salary - standardDeduction);
  const tax2025 = taxableIncome2025 > 1200000 ? calculateTax(taxableIncome2025, taxSlabs2025) : 0;
  const inHand2025 = salary - tax2025;

  // Calculate tax savings
  const taxSavings = tax2024 - tax2025;
  const savingsMessage =
    taxSavings > 0
      ? `🎉 You save ₹${taxSavings.toLocaleString()} in FY 2025-26!`
      : taxSavings < 0
      ? `⚠️ You pay ₹${Math.abs(taxSavings).toLocaleString()} more in FY 2025-26!`
      : "No difference in tax amount.";

  return (
    <div className="container">
      <h2>Income Tax Calculator (2024 vs 2025)</h2>
      <label>Enter Annual Salary:</label>
      <input
        type="text"
        value={salary}
        onChange={(e) => handleInputChange(e)}
        />

      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Taxable Income</th>
            <th>Tax Payable</th>
            <th>In-Hand Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FY 2024-25</td>
            <td>₹{taxableIncome2024.toLocaleString()}</td>
            <td>₹{tax2024.toLocaleString()}</td>
            <td>₹{inHand2024.toLocaleString()}</td>
          </tr>
          <tr>
            <td>FY 2025-26</td>
            <td>₹{taxableIncome2025.toLocaleString()}</td>
            <td>₹{tax2025.toLocaleString()}</td>
            <td>₹{inHand2025.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div className={`savings ${taxSavings >= 0 ? "positive" : "negative"}`}>
        {savingsMessage}
      </div>
    </div>
  );
};

export default TaxCalculator;
