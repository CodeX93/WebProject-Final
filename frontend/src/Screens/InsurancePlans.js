import React, { useState, useEffect } from "react";
import axios from "axios";
import InsuranceProduct from "../Components/InsuranceProduct";
import HeaderNavBar from "../Components/HeaderNavBar";

export default function InsurancePlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/insurance/get-plans"
        );
        setPlans(response.data);
        // console.log(plans);
      } catch (error) {
        console.log("Error fetching plans:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="InsurancePlan">
        <HeaderNavBar />
        <h1>Insurance Plans</h1>
        <div className="ProductGrid">
          <div className="grid-container">
            {plans.map((plan) => (
              <div className="grid-item">
                <InsuranceProduct
                  key={plan.id}
                  Title={plan.CompanyName}
                  Description={"Rate: " + plan.Rate.$numberDecimal}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
