import { useEffect, useState } from "react";

const useServices = () => {
  const [serviceItem, setServiceItem] = useState([]);
  console.log(serviceItem)

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServiceItem(data));
  }, []);

  return [serviceItem];
};

export default useServices;
