import React, { useState, useEffect } from "react";
import "./gifImage.css";
import proposal1 from "../../images/propose1.gif";
import request2 from "../../images/request2.gif";
import request3 from "../../images/request3.gif";
import accepted4 from "../../images/accepted4.gif";

function GifImage() {
  const [proposalStep, setProposalStep] = useState(1);
  const [noButtonClickCount, setNoButtonClickCount] = useState(0);
  const [isNoButtonDisplaced, setIsNoButtonDisplaced] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [yesButtonImage, setYesButtonImage] = useState(null); // State to track the image clicked on "Yes" button

  useEffect(() => {
    const handleMouseMove = (event) => {
      const distanceThreshold = 100; // Set the distance threshold here
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const buttonX = noButtonPosition.x;
      const buttonY = noButtonPosition.y;
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonX, 2) + Math.pow(mouseY - buttonY, 2)
      );
      if (isNoButtonDisplaced && distance < distanceThreshold) {
        setNoButtonPosition((prevPosition) => {
          const newX = Math.random() * (window.innerWidth - 100) + 50; // Adjusted for button size
          const newY = Math.random() * (window.innerHeight - 100) + 50; // Adjusted for button size
          return { x: newX, y: newY };
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [noButtonPosition, isNoButtonDisplaced]);

  const handleNoClick = () => {
    if (noButtonClickCount < 1) {
      setNoButtonClickCount((prevCount) => prevCount + 1);
    } else {
      setIsNoButtonDisplaced(true);
      setIsButtonDisabled(true); // Disable the button after the second click
      setProposalStep(3); // Set proposalStep to 3 after the second click
      return; // Prevent further clicks after displacing the button
    }

    setProposalStep((prevStep) => {
      if (prevStep === 1) return 2;
      else if (prevStep === 2) return 3;
      else return 1;
    });
  };

  const handleYesClick = (image) => {
    setIsYesClicked(true);
    setYesButtonImage(image); // Set the clicked image to display
  };

  return (
    <div className="gif-image-container">
      {isYesClicked ? (
        <div className="centered-content">
          <h1 className="heading">Yeah! I knew it. ❤️</h1>
          <img className="gif-image" src={yesButtonImage} alt="GIF" />
        </div>
      ) : (
        <div className="centered-content">
          <h1 className="heading">
            {proposalStep === 1
              ? "Do you love me? 🥺"
              : proposalStep === 2
              ? "Soch lo ache se! 😔"
              : "Ek or bar soch lo! 💔"}
          </h1>
          <img
            className="gif-image"
            src={
              proposalStep === 1
                ? proposal1
                : proposalStep === 2
                ? request2
                : request3
            }
            alt="GIF"
          />
        </div>
      )}
      <div className="button-container">
        <button
          className="btn btn-yes"
          onClick={() => handleYesClick(accepted4)}
        >
          Yes
        </button>
        <button
          className={`btn btn-no ${
            isNoButtonDisplaced ? "btn-no-displaced" : ""
          }`}
          onClick={handleNoClick}
          disabled={isButtonDisabled} // Disable the button after the second click
          style={{
            top: `${noButtonPosition.y}px`,
            left: `${noButtonPosition.x}px`,
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default GifImage;
