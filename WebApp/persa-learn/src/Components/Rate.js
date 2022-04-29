import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import styles from "./Rate.module.css";
const Rate = ({ rating = 0, onRating, isLocked = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const stars = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <AiFillStar
          key={i + 1}
          onClick={() => (!isLocked ? onRating(i + 1) : {})}
          style={
            hoverRating >= i + 1 || rating >= i + 1 ? { color: "yellow" } : {}
          }
          onMouseEnter={() => (!isLocked ? setHoverRating(i + 1) : {})}
          onMouseLeave={() => (!isLocked ? setHoverRating(0) : {})}
        />
      ));
  });

  return (
    <div className={styles.star_container}>
      {/* <AiFillStar onClick={() => onRating(1)} />
      <AiFillStar onClick={() => onRating(2)} />
      <AiFillStar onClick={() => onRating(3)} />
      <AiFillStar onClick={() => onRating(4)} />
      <AiFillStar onClick={() => onRating(5)} /> */}
      {stars}
    </div>
  );
};

Rate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default Rate;
