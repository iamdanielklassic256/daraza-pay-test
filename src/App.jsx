import { useState } from "react";
import "./App.css";
const StunningPaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnimating(true);
    const phone = `+256${phoneNumber.slice(1)}`;
    const data = {
      method: 1,
      amount: Number(amount),
      phone: phone,
      note: "Payment",
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key PmU43Tvn.HUpZDJNUTQczIX4457In3wFDK6ngqiLi`,
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        "https://daraza.net/api/request_to_pay/",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`${response.statusText} - ${response.status}`);
      }
      const result = await response.json();
      if (result.code === "Success") {
        alert(`Payment successful! ${result.message}`);
        setAmount("");
        setPhoneNumber("");
      } else if (result.code === "Error") {
        alert(`Payment failed: ${result.message}. Details: ${result.details}`);
      }
    } catch (error) {
      alert("An unexpected error occurred: " + error.message);
      console.error("Payment Error:", error);
    } finally {
      setIsAnimating(false);
    }
  };
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };
  return (
    <div className="payment-wrapper">
      {" "}
      <div
        className={`payment-container ${isAnimating ? "animate-submit" : ""}`}
      >
        {" "}
        <div className="form-header">
          {" "}
          <div className="header-content">
            {" "}
            <h1>Complete Payment</h1> <p>Secure and instant transaction</p>{" "}
          </div>{" "}
          <div className="header-icon">����</div>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit} className="stunning-form">
          {" "}
          <div className="input-group">
            {" "}
            <div className="input-icon">$</div>{" "}
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter Amount"
              required
              className="stunning-input"
            />{" "}
          </div>{" "}
          <div className="input-group">
            {" "}
            <div className="input-icon">📱</div>{" "}
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone Number"
              required
              maxLength="10"
              className="stunning-input"
            />{" "}
          </div>{" "}
          <button
            type="submit"
            className="submit-button"
            disabled={isAnimating}
          >
            {" "}
            {isAnimating ? "Processing..." : "Pay Now"}{" "}
          </button>{" "}
        </form>{" "}
        {isAnimating && (
          <div className="loading-overlay">
            {" "}
            <div className="spinner"></div>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default StunningPaymentForm;
