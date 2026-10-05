import React, { useState } from "react";
import "./U2Exp3.css";

function U2Exp3({ cart, setPage }) {
  const [traveler, setTraveler] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    travelers: 1,
  });

  const [confirmed, setConfirmed] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleChange = (e) => {
    setTraveler({
      ...traveler,
      [e.target.name]: e.target.value,
    });
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <main className="exp3">
        <div className="success">
          <h1>🎉 Booking Confirmed!</h1>

          <p>Thank you, {traveler.name}.</p>

          <p>Your trip has been successfully booked.</p>

          <h3>Booking Status: Confirmed</h3>

          <button onClick={() => setPage("home")}>
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="exp3">
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>No Package Selected</h2>

          <button onClick={() => setPage("packages")}>
            Browse Packages
          </button>
        </div>
      ) : (
        <div className="checkout">

          <form
            className="form"
            onSubmit={confirmBooking}
          >
            <h2>Traveler Information</h2>

            <input
              name="name"
              placeholder="Full Name"
              value={traveler.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={traveler.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={traveler.phone}
              onChange={handleChange}
              required
            />

            <input
              name="date"
              type="date"
              value={traveler.date}
              onChange={handleChange}
              required
            />

            <input
              name="travelers"
              type="number"
              min="1"
              value={traveler.travelers}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Confirm Booking
            </button>
          </form>

          <div className="summary">
            <h2>Booking Summary</h2>

            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <span>{item.name}</span>
                <span>
                  ₹{item.price.toLocaleString()}
                </span>
              </div>
            ))}

            <hr />

            <h2>
              Total: ₹{total.toLocaleString()}
            </h2>
          </div>

        </div>
      )}
    </main>
  );
}

export default U2Exp3;