import { useEffect, useState } from "react";

const useReview = () => {
  const [reviewItem, setReviewItem] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviewItem(data));
  }, []);

  return [reviewItem];
};

export default useReview;
