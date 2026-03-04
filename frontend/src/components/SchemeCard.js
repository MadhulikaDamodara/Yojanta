import React from "react";

function SchemeCard({ scheme }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "15px",
        borderRadius: "8px",
        background: "#f9f9f9"
      }}
    >
      <h3>{scheme.name}</h3>

      <p><b>Benefits:</b> {scheme.benefits}</p>

      <p><b>Category:</b> {scheme.categoryType}</p>

      <p><b>Max Income:</b> {scheme.maxIncome}</p>
    </div>
  );
}

export default SchemeCard;