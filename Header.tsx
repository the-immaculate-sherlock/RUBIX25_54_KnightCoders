import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, HelpCircle, User, Calculator, ClipboardCheck } from "lucide-react";

interface HeaderProps {
  showAuthButtons?: boolean; // Optional prop to control auth buttons
  applicationStatus?: string; // Optional prop to display application status
}

export default function Header({ showAuthButtons = false, applicationStatus }: HeaderProps) {
  return (
    <header style={{ backgroundColor: "#1B263B", color: "white", padding: "0.5rem 0" }}>
      <nav style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "4rem" }}>
          {/* Logo Section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white" }}>
              <Home style={{ width: "2rem", height: "2rem" }} />
              <span style={{ marginLeft: "0.5rem", fontSize: "1.25rem", fontWeight: "bold" }}>HomeHaven</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              to="/search"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white", fontSize: "0.9rem" }}
            >
              <Search style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              Find Housing
            </Link>
            <Link
              to="/government-aid"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white", fontSize: "0.9rem" }}
            >
              <HelpCircle style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              Aid Programs
            </Link>
            <Link
              to="/housing-subsidy-calculator"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white", fontSize: "0.9rem" }}
            >
              <Calculator style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              EMI & Subsidy Calculator
            </Link>
            <Link
              to="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E0E1DD",
                color: "#0D1B2A",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              <User style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              Dashboard
            </Link>

            {/* Real-time Application Status */}
            {applicationStatus && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E0E1DD",
                  color: "#0D1B2A",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                }}
              >
                <ClipboardCheck style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
                <span>Application: {applicationStatus}</span>
              </div>
            )}

            {/* Auth Buttons */}
            {showAuthButtons && (
              <>
                <Link
                  to="/signup"
                  style={{
                    backgroundColor: "#E0E1DD",
                    color: "#0D1B2A",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  style={{
                    backgroundColor: "#E0E1DD",
                    color: "#0D1B2A",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    textDecoration: "none",
                  }}
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

