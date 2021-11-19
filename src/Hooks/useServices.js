import { useEffect, useState } from "react";

const useServices = () => {
  const [serviceItem, setServiceItem] = useState([]);
  console.log(serviceItem)

  useEffect(() => {
    fetch("https://infinite-fjord-84665.herokuapp.com/services")
      .then((res) => res.json())
      .then((data) => setServiceItem(data));
  }, []);

  return [serviceItem];
};

export default useServices;
