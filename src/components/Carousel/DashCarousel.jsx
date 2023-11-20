import { useState } from "react";
import PropTypes from "prop-types";
import "./DashCarousel.css"; // make sure to create a CSS file for styling

const DashCarousel = ({ headerTitle, dashItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < dashItems.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="history-carousel">
      <div className="carousel-header">
        <h2>{headerTitle}</h2>
        <button className="see-all-button">SEE ALL</button>
      </div>
      <div className="carousel-cards">
        {/* Conditionally render the previous, current, and next cards */}
        {currentIndex > 0 && dashItems[currentIndex - 1]}
        {dashItems[currentIndex]}
        {currentIndex < dashItems.length - 1 && dashItems[currentIndex + 1]}
      </div>
      <div className="carousel-navigation">
        <button onClick={goPrev}>&lt;</button>
        <button onClick={goNext}>&gt;</button>
      </div>
    </div>
  );
};

DashCarousel.propTypes = {
  headerTitle: PropTypes.string.isRequired, // Add proptype for headerTitle
  dashItems: PropTypes.array.isRequired,
};

export default DashCarousel;
