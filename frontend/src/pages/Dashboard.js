import  API  from "../api/api";
import React, { useState } from "react";
import FilterPanel from "../components/FilterPanel";
import SchemeCard from "../components/SchemeCard";

function Dashboard() {

  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    state: "",
    occupation: "",
    income: "",
    category: ""
  });

  const [schemes, setSchemes] = useState([]);

 const getSchemes = async () => {
  try {
    const res = await API.post("/schemes/recommend", filters);
    setSchemes(res.data);
  } catch (error) {
    console.error("API error:", error);
  }
};

  return (
    <div style={{ display: "flex" }}>

      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        getSchemes={getSchemes}
      />

      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Eligible Schemes</h2>

        {schemes.map((scheme) => (
          <SchemeCard key={scheme._id} scheme={scheme} />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;