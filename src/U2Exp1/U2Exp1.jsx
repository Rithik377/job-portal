import React, { useState } from "react";
import "./U2Exp1.css";
import U2Exp2 from "../U2Exp2/U2Exp2";
import U2Exp3 from "../U2Exp3/U2Exp3";

const packages = [
  {
    id: 1,
    name: "Goa Beach Escape",
    destination: "Goa",
    duration: "4 Days / 3 Nights",
    price: 12999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Kerala Nature Tour",
    destination: "Kerala",
    duration: "5 Days / 4 Nights",
    price: 15999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Manali Adventure",
    destination: "Manali",
    duration: "6 Days / 5 Nights",
    price: 18999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
];

function Header({ page, setPage, cart }) {
  return (
    <header>
      <h2>TravelGo</h2>

      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("packages")}>Packages</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("contact")}>Contact</button>
        <button onClick={() => setPage("cart")}>
          🛒 Cart ({cart.length})
        </button>
      </nav>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <main className="hero">
      <h1>Explore The World 🌍</h1>
      <p>Discover and book your perfect holiday.</p>

      <button onClick={() => setPage("packages")}>
        Explore Packages
      </button>
    </main>
  );
}

function Packages({ setSelected, setPage, addToCart }) {
  return (
    <main>
      <h1>Travel Packages</h1>

      <div className="grid">
        {packages.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <p>📍 {p.destination}</p>
            <p>🕒 {p.duration}</p>
            <p>⭐ {p.rating}</p>
            <h3>₹{p.price.toLocaleString()}</h3>

            <button
              onClick={() => {
                setSelected(p);
                setPage("details");
              }}
            >
              View Details
            </button>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

function Details({ item, addToCart, setPage }) {
  if (!item) {
    return <h2>No package selected</h2>;
  }

  return (
    <main>
      <div className="details">
        <img src={item.image} alt={item.name} />

        <div>
          <h1>{item.name}</h1>
          <p>📍 {item.destination}</p>
          <p>🕒 {item.duration}</p>
          <p>⭐ {item.rating}</p>
          <h2>₹{item.price.toLocaleString()}</h2>

          <button
            onClick={() => {
              addToCart(item);
              setPage("cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

function Cart({ cart, setCart, setPage }) {
  const remove = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  return (
    <main>
      <h1>Booking Cart 🛒</h1>

      {cart.length === 0 ? (
        <>
          <h3>No packages added.</h3>

          <button onClick={() => setPage("packages")}>
            Browse Packages
          </button>
        </>
      ) : (
        <>
          {cart.map((p) => (
            <div className="cart" key={p.id}>
              <h3>{p.name}</h3>

              <p>₹{p.price.toLocaleString()}</p>

              <button onClick={() => remove(p.id)}>
                Remove
              </button>
            </div>
          ))}

          <button onClick={() => setPage("checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  );
}

function About() {
  return (
    <main>
      <h1>About TravelGo</h1>
      <p>Your trusted travel booking platform.</p>
    </main>
  );
}

function Contact() {
  return (
    <main>
      <h1>Contact Us</h1>

      <input placeholder="Your Name" />
      <input placeholder="Email" />
      <br />
      <button>Send Message</button>
    </main>
  );
}

function U2Exp1() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (!cart.some((p) => p.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  return (
    <>
      <Header
        page={page}
        setPage={setPage}
        cart={cart}
      />

      {page === "home" && <Home setPage={setPage} />}

      {page === "packages" && (
  <U2Exp2
    cart={cart}
    setCart={setCart}
    setPage={setPage}
  />
)}

      {page === "details" && (
        <Details
          item={selected}
          addToCart={addToCart}
          setPage={setPage}
        />
      )}
      {page === "checkout" && (
  <U2Exp3
    cart={cart}
    setPage={setPage}
  />
)}

      {page === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}

      {page === "about" && <About />}

      {page === "contact" && <Contact />}
    </>
  );
}

export default U2Exp1;