import React, { useEffect, useState } from "react";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  const handleDelete = (id) => {
    const url = `http://localhost:5000/services/${id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert("deleted");
          const remaining = services.filter((service) => service._id !== id);
          setServices(remaining);
        }
      });
  };
  return (
    <div className="border-2" style={{ marginTop: "100px" }}>
      {services.map((service) => (
        <dov key={service._id}>
          <div
            style={{
              border: "1px solid gray",
              backgroundColor: "pink",
              margin: "10px auto",
              width: "400px",
              padding: "20px",
            }}
          >
            <h2>{service.name}</h2>
            <button
              onClick={() => handleDelete(service._id)}
              className="btn btn-primary my-2"
            >
              Delete ❌
            </button>
          </div>
        </dov>
      ))}
    </div>
  );
};

export default ManageServices;
