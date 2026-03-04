import React from "react";

function FilterPanel({ filters, setFilters, getSchemes }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px", borderRight: "1px solid #ddd" }}>
      <h3>Filters</h3>

      <input name="age" placeholder="Age" onChange={handleChange} />
      <br /><br />

      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <br /><br />

      <input name="state" placeholder="State" onChange={handleChange} />
      <br /><br />

      <input name="occupation" placeholder="Occupation" onChange={handleChange} />
      <br /><br />

      <input name="income" placeholder="Income" onChange={handleChange} />
      <br /><br />

      <input name="category" placeholder="Category" onChange={handleChange} />
      <br /><br />

      <button onClick={getSchemes}>Find Schemes</button>
    </div>
  );
}

export default FilterPanel;