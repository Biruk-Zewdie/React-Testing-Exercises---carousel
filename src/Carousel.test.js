import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

//smoke test 
test ("renders without crushing", () => {
  render(<Carousel photos={TEST_IMAGES}
    title="images for testing" />)
});

//snapshot test 
test ("should match to snapshot", () => {
  const {asFragment} = render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing" 
    />)
  expect (asFragment()).toMatchSnapshot()

})


/*=============================Failing Test Due to left arrow ======================================*/
//
//- checks for this bug. expects that when you’re on the second image, 
//clicking the left arrow will move you to the first image.
test ("the left arrow should display us the previous image", () =>{
  // render the carousel image component 
  const {container} = render ( 
  <Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />)
  //expect the first image to show 
  expect(container.querySelector("img[alt = 'testing image 1']")).toBeInTheDocument();

  //hit the next button and expect the carousel show only the second image. 
  const nextBtn = container.querySelector(".bi-arrow-right-circle")
  fireEvent.click(nextBtn);

  expect (container.querySelector("img[alt = 'testing image 2']")).toBeInTheDocument();

  //hit the left arrow /previous btn/ and expect the carousel go back to the previous image the first image.
  //this test will fail because we don't have go previous function.

  const previousBtn = container.querySelector(".bi-arrow-left-circle")
  fireEvent.click(previousBtn);

  expect (container.querySelector("img[alt = 'testing image 1']")).toBeInTheDocument();

  //but it display the third image instead of the first image.
  //expect (container.querySelector("img[alt = 'testing image 3']")).toBeInTheDocument();
  
})

/*=======Failing Test Due to occurence of left arrow with the first image and right arrow with the last image =============*/
const {container} = render (
<Carousel photos = {TEST_IMAGES} 
title ="images for testing"
/>)

expect(container.querySelector("img[alt = 'testing image 1']")).toBeInTheDocument()

//expect the left arrow not to be in the document 
expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument() 
//expect the right arrow to be in the document 
expect(container.querySelector(".bi-arrow-right-circle")).toBeInTheDocument()

// move forward in the carousel 
//do a couple of clicks to get the last image 
const numberOfClicks = TEST_IMAGES.length - 1;

// Move forward in the carousel
for (let i = 0; i < numberOfClicks; i++) {
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
}

// Assert that the last image is present
expect(container.querySelector("img[alt = 'testing image 3']")).toBeInTheDocument()
// Assert that the right arrow is not in the document anymore
expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument()

/*====================================================================== */
it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
