import React, { useState } from "react";

const locations = [
  { id: 1, name: "Urban", subsidyMultiplier: 1.2 },
  { id: 2, name: "Rural", subsidyMultiplier: 1.5 },
  { id: 3, name: "Semi-Urban", subsidyMultiplier: 1.3 },
];

const subsidyPrograms = [
  {
    id: 1,
    title: "Pradhan Mantri Awas Yojana (Urban)",
    baseSubsidy: 200000,
    locationMultiplier: 1.2, // Example for urban location
    eligibilityIncome: 1800000, // Annual income eligibility cap
  },
  {
    id: 2,
    title: "Pradhan Mantri Awas Yojana (Rural)",
    baseSubsidy: 250000,
    locationMultiplier: 1.5,
    eligibilityIncome: 120000,
  },
  {
    id: 3,
    title: "Credit Linked Subsidy Scheme (CLSS)",
    baseSubsidy: 300000,
    locationMultiplier: 1.3,
    eligibilityIncome: 1800000,
  },
];

export default function HousingSubsidyAndEMICalculator() {
  const [income, setIncome] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [eligibleSubsidy, setEligibleSubsidy] = useState([]);

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateSubsidy = () => {
    if (!income || !selectedLocation) {
      alert("Please enter your income and select a location.");
      return;
    }

    const eligiblePrograms = subsidyPrograms
      .filter((program) => program.eligibilityIncome >= income)
      .map((program) => {
        const calculatedSubsidy =
          program.baseSubsidy * selectedLocation.subsidyMultiplier;
        return {
          title: program.title,
          subsidy: calculatedSubsidy,
        };
      });

    setEligibleSubsidy(eligiblePrograms);
  };

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const tenure = parseFloat(loanTenure) * 12; // Tenure in months

    if (!principal || !rate || !tenure) {
      alert("Please enter valid inputs!");
      return;
    }

    const emiAmount =
      (principal * rate * Math.pow(1 + rate, tenure)) / 
      (Math.pow(1 + rate, tenure) - 1);

    setEmi(emiAmount.toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Housing Subsidy and EMI Calculator</h1>
      <p className="mt-4 text-gray-600">
        Estimate the government subsidy you may be eligible for based on your income and location, and calculate your monthly EMI for a loan.
      </p>

      {/* Housing Subsidy Calculator Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Housing Subsidy Calculator</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Annual Income (₹)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              placeholder="Enter your income"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Your Location</label>
            <select
              value={selectedLocation ? selectedLocation.id : ""}
              onChange={(e) =>
                setSelectedLocation(
                  locations.find((loc) => loc.id === Number(e.target.value))
                )
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateSubsidy}
          className="mt-4 px-6 py-3 bg-[#0D1B2A] text-white font-semibold rounded-md shadow hover:bg-[#0D1B2A] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Calculate Subsidy
        </button>

        {eligibleSubsidy.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900">Eligible Subsidy Programs</h3>
            <ul className="mt-4 space-y-4">
              {eligibleSubsidy.map((program, index) => (
                <li key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800">{program.title}</h4>
                  <p className="mt-2 text-gray-600">Estimated Subsidy: ₹{program.subsidy.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* EMI Calculator Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">EMI Calculator</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate (% per annum)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tenure (Years)</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter tenure in years"
            />
          </div>
        </div>

        <button
          onClick={calculateEMI}
          className="mt-4 px-4 py-2 bg-[#0D1B2A] text-white font-medium rounded-md shadow hover:bg-[#0D1B2A]"
        >
          Calculate EMI
        </button>

        {emi && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800">Estimated EMI: ₹{emi}/month</h3>
          </div>
        )}
      </div>
    </div>
  );
}
