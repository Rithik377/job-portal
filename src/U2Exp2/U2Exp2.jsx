import React, { useState } from "react";
import "./U2Exp2.css";

const packages = [
  {
    id: 1,
    name: "Goa Beach Escape",
    destination: "Goa",
    duration: 4,
    price: 12999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Kerala Nature Tour",
    destination: "Kerala",
    duration: 5,
    price: 15999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Manali Adventure",
    destination: "Manali",
    duration: 6,
    price: 18999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
];

function U2Exp2({ cart, setCart, setPage }) {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const addToCart = (item) => {
    if (!cart.some((p) => p.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const filtered = packages.filter((p) => {
    const searchMatch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());

    const destinationMatch =
      !destination || p.destination === destination;

    const durationMatch =
      !duration ||
      (duration === "1-3" && p.duration <= 3) ||
      (duration === "4-5" && p.duration >= 4 && p.duration <= 5) ||
      (duration === "6+" && p.duration >= 6);

    const priceMatch =
      !price ||
      (price === "low" && p.price < 15000) ||
      (price === "mid" && p.price >= 15000 && p.price <= 20000) ||
      (price === "high" && p.price > 20000);

    const ratingMatch =
      !rating || p.rating >= Number(rating);

    return (
      searchMatch &&
      destinationMatch &&
      durationMatch &&
      priceMatch &&
      ratingMatch
    );
  });

  return (
    <main className="exp2">
      <h1>Travel Packages</h1>

      <input
        className="search"
        placeholder="Search package or destination"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">All Destinations</option>
          <option value="Goa">Goa</option>
          <option value="Kerala">Kerala</option>
          <option value="Manali">Manali</option>
        </select>

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="">Any Duration</option>
          <option value="1-3">1-3 Days</option>
          <option value="4-5">4-5 Days</option>
          <option value="6+">6+ Days</option>
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="low">Below ₹15,000</option>
          <option value="mid">₹15,000-₹20,000</option>
          <option value="high">Above ₹20,000</option>
        </select>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Any Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <h2>No travel packages found</h2>
      ) : (
        <div className="exp2-grid">
          {filtered.map((p) => (
            <div className="exp2-card" key={p.id}>
              <img src={p.image} alt={p.name} />

              <h3>{p.name}</h3>
              <p>📍 {p.destination}</p>
              <p>🕒 {p.duration} Days</p>
              <p>⭐ {p.rating}</p>
              <h3>₹{p.price.toLocaleString()}</h3>

              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <hr />

      <h2>Cart ({cart.length})</h2>

      {cart.map((p) => (
        <div className="cart-item" key={p.id}>
          <span>{p.name}</span>

          <button onClick={() => removeFromCart(p.id)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={() => setPage("cart")}>
          View Cart
        </button>
      )}
    </main>
  );
}

export default U2Exp2;