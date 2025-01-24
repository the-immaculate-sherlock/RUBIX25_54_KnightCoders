import React, { useState } from "react";
import { Search, DollarSign, Home as HomeIcon, MapPin } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    // Pass the search criteria to the parent component
    onSearch({ location, priceRange, propertyType });
  };

  const styles = {
    container: {
      backgroundColor: "#E0E1DD",
      padding: "24px",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "800px",
      margin: "0 auto",
      position: "relative",
      zIndex: 10,
      marginTop: "-32px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "16px",
      justifyContent: "center",
    },
    gridMd: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    inputContainer: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "8px 12px 8px 40px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "16px",
    },
    icon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#E0E1DD",
    },
    select: {
      width: "100%",
      padding: "8px 12px 8px 40px",
      border: "1px solid #d1d5db",
      borderRadius: "15px",
      fontSize: "16px",
      backgroundColor: "#1B263B",
      color: "#E0E1DD",
    },
    button: {
      backgroundColor: "#0D1B2A",
      color: "#E0E1DD",
      padding: "8px 24px",
      borderRadius: "8px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.grid, ...styles.gridMd }}>
        {/* Location Dropdown */}
        <div style={styles.inputContainer}>
          <MapPin style={styles.icon} />
          <select
            style={styles.select}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Price Range Dropdown */}
        <div style={styles.inputContainer}>
          <DollarSign style={styles.icon} />
          <select
            style={styles.select}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="0-500">$0 - $500</option>
            <option value="501-1000">$501 - $1,000</option>
            <option value="1001-1500">$1,001 - $1,500</option>
            <option value="1501+">$1,501+</option>
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div style={styles.inputContainer}>
          <HomeIcon style={styles.icon} />
          <select
            style={styles.select}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
            <option value="shared">Shared Housing</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5A738E")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1B263B")}
        >
          <Search style={{ marginRight: "8px", width: "20px", height: "20px" }} />
          Search
        </button>
      </div>
    </div>
  );
}
