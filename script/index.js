
// All data container
const bookedSeats = [];
let availableSeat = 40;
let ticketPrice = 550;
const couponCodes = {
  NEW15: 15,
  Couple20: 20,
};

// Selectors

const couponButton = document.getElementById('coupon-button')
const seatsBtns = document.querySelectorAll('.seat-click-btn')
const couponInputField = document.getElementById("coupon-input")
const totalPriceBtn = document.getElementById('total-price')
const discountPriceBtn = document.getElementById('discount-price')
const grandTotal = document.getElementById('grand-total')
const passengerForm = document.getElementById('passenger-form')

// get total price

function getTotalPrice(seats, ticketPrice) {
  return seats * ticketPrice;
}

function calculateTotalTicketPrice() {
  const totalPrice = getTotalPrice(bookedSeats.length, ticketPrice)
  const couponValue = couponInputField.value;
  const discountPercentage = couponCodes[couponValue] || 0;
  const discountPrice = totalPrice * (1 - discountPercentage / 100);
  return discountPrice;
}
function updateTotalTicketPrice() {
  const discountedPrice = calculateTotalTicketPrice();
  const totalPrice = getTotalPrice(bookedSeats.length, ticketPrice)
  const discountAmount = totalPrice - discountedPrice;
  totalPriceBtn.textContent =
    totalPrice;
  discountPriceBtn.textContent = discountAmount;
  grandTotal.textContent = totalPrice - discountAmount
}

function handleCouponApply() {
  const couponInput = document.getElementById("coupon-input").value;
  if (!(couponInput in couponCodes)) {
    alert("Invalid Coupon Code");
    return;
  }
  updateTotalTicketPrice();
  document.getElementById("discount-content").style.display = "none";
}

couponButton.addEventListener('click', handleCouponApply)

// Function to create a paragraph element with the given text content
function createParagraph(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

// Function to update seat information
function updateSeatInfo(serial, seatSerial, classSerial, ticketPrice) {
  // Update seat serial
  const titleContainer = document.getElementById("seat-class-price");
  titleContainer.appendChild(createParagraph(`${serial}. ${seatSerial}`));

  // Update class serial
  const classContainer = document.getElementById("class-seat-price");
  classContainer.appendChild(createParagraph(classSerial));

  // Update price serial
  const priceContainer = document.getElementById("price-seat-class");
  priceContainer.appendChild(createParagraph(ticketPrice));
}

// Function to handle button click event
function handleButtonClick(event) {
  const clickButton = event.target;

  if (clickButton.classList.contains("selected")) {
    alert('This seat already booked')
    return;
  }
  if (bookedSeats.length >= 4) {
    alert("You have already 4 seat selected");
    return;
  }
  if (!availableSeat) {
    alert("No seat available!")
  }

  // Seat information
  const seatSerial = clickButton.textContent;
  const classSerial = "Economy"; // Corrected the spelling

  // Update seat information
  updateSeatInfo(bookedSeats.length + 1, seatSerial, classSerial, ticketPrice);

  // Update button styles and data
  clickButton.classList.add("selected");
  clickButton.style.backgroundColor = "#1dd100";
  clickButton.style.color = "white";



  // Update selected seats and counts
  const selectedSeat = clickButton.textContent;
  bookedSeats.push(selectedSeat);
  const selectedCount = bookedSeats.length;


  document.getElementById("select-seat").textContent = selectedCount;

  // Update total ticket price
  updateTotalTicketPrice();
}

passengerForm.addEventListener('submit', function (e) {
  e.preventDefault()
  if (bookedSeats.length) {
    my_modal_3.showModal()
    availableSeat -= bookedSeats.length
    // Update UI
    document.getElementById("left-seat").textContent = availableSeat;
    bookedSeats.length = 0
    document.getElementById("class-seat-price").innerHTML = null
    document.getElementById("price-seat-class").innerHTML = null
    document.getElementById("seat-class-price").innerHTML = null
    document.getElementById("select-seat").textContent = 0;
  } else {
    alert('Please Select at least one seat!')
  }
})
for (const button of seatsBtns) {
  button.addEventListener("click", handleButtonClick);
}