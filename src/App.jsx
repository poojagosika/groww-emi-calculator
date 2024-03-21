import React, { useEffect, useState } from "react";
import { tenureData } from "./constants";

const App = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState();
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState();

  const s = "abcsfoiewirwef";

  const freq = {}; // creates an object

  for (let char of s) {
    //abcsfoiewirwef
    //1st time - "a" - freq[char] = undefined initially --> 0 + 1 = 1;
    //2nd time - b - freq[char] = undefined initially --> 0+1 = 1;
    //i - freq[char] = undefined initially --> 0+1 = 1;
    //again i for 2nd time => freq[i] = 1, 1+1 = 2;
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let char in freq) {
    console.log(`${char}: ${freq[char]}`);
  }

  //a:1, b:1,c:1,s:1,f:2,o:1,i:2,

  const calculateEMI = (downpayment) => {
    if (!cost) return;

    const loanAmount = cost - downpayment;

    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!cost > 0) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure]);

  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value); //dp - downpayment
    setDownPayment(Number(e.target.value).toFixed(0));
    //calculate
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);

    setDownPayment(dp);
  };
  return (
    <div className="container mt-5">
      <form>
        <h1 className="text-center">EMI Calculator</h1>
        <div className="mb-3">
          <label htmlFor="Total Cost of Asset" className="form-label">
            Total Cost of Asset
          </label>
          <input
            type="number"
            className="form-control"
            id="Total Cost of Asset"
            placeholder="Total Cost of Assets"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Interest Rate" className="form-label">
            Interest Rate (in %)
          </label>
          <input
            type="number"
            className="form-control"
            id="Interest Rate"
            placeholder="Interest Rate (in %)"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Processing Fee" className="form-label">
            Processing Fee (in %)
          </label>
          <input
            type="number"
            className="form-control"
            id="Processing Fee"
            placeholder="Processing Fee (in %)"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customRange1" className="form-label">
            Down Payment
          </label>
          <p>
            Total Down Payment - ₹
            {(Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(
              0
            )}
          </p>
          <input
            type="range"
            min={0}
            max={cost}
            className="form-range"
            id="customRange1"
            value={downPayment}
            onChange={updateEMI}
          />
          <div className="d-flex justify-content-between">
            <label>0%</label>
            <b>₹{downPayment}</b>
            <label>100%</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="customRange1" className="form-label">
            Loan Per Month
          </label>
          <p>Total Loan Amount - ₹{(emi * tenure).toFixed(0)}</p>
          <input
            type="range"
            min={calculateEMI(cost)}
            max={calculateEMI(0)}
            className="form-range"
            id="customRange1"
            value={emi}
            onChange={updateDownPayment}
          />
          <div className="d-flex justify-content-between">
            <label>{calculateEMI(cost)}</label>
            <b>₹{emi}</b>
            <label>{calculateEMI(0)}</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="customRange1" className="form-label">
            Tenure
          </label>
          <div className="d-flex justify-content-between">
            {tenureData.map((e, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  className={`btn btn-primary ${
                    e === tenure
                      ? "selected btn btn-success"
                      : "btn btn-primary"
                  }`}
                  onClick={() => setTenure(e)}
                >
                  {e}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
