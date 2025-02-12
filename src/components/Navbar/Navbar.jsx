import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import cart from "../../assets/cart.png";
import { FaArrowCircleDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { IoIosContact } from "react-icons/io";

export default function Navbar() {
  const navigate = useNavigate();
  const [currentAddress, setCurrentAddress] = useState(null);
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setCurrentAddress(addresses[0] || null);
  }, []);

  const handleLoginSignupClick = () => {
    navigate("/profile");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLocationClick = () => {
    navigate("/addresspage");
  };

  const isActive = (path) => window.location.pathname === path;

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.offer}>
          🌟 Get 5% Off your first order,
          <span className={styles.promo}>Promo: ORDER5</span>
        </p>
        <div className={styles.cartLocation}>
          <p>
            <HiLocationMarker className={styles.loc} />
            {currentAddress
              ? `${currentAddress.fullAddress}, ${currentAddress.city}`
              : ""}
          </p>
          <p className={styles.change} onClick={handleLocationClick}>
            Change Location
          </p>
          <div className={styles.cartConatiner}>
            <img src={cart} alt="cart" className={styles.cart} />
            <span className={styles.cartText}> My Cart </span>
            <div className={styles.separator}></div>
            <div className={styles.arrow}>
              <FaArrowCircleDown />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.menu}>
          <a
            onClick={() => handleNavigation("/homepage")}
            className={isActive("/homepage") ? styles.active : ""}
          >
            Home
          </a>
          <a>Browse Menu</a>
          <a>Special Offers</a>
          <a
            onClick={() => handleNavigation("/productpage")}
            className={isActive("/productpage") ? styles.active : ""}
          >
            Restaurants
          </a>
          <a>Track Order</a>
        </div>
        <div className={styles.loginSignup} onClick={handleLoginSignupClick}>
          {userName ? (
            <span className={styles.username}>
              <IoIosContact className={styles.contact} />
              Hey {userName}
            </span>
          ) : (
            <a>
              <IoIosContact className={styles.contact} /> Login/Signup
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
