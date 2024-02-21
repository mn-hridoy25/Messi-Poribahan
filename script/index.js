let selectedSeats = [];
let availableSeat = 40;
let sitPrice = 550;
let serial = 1;
let discountCodes = {
  NEW15: 15,
  Couple20: 20,
};
function calculateTotalPrice() {
  const totalPrice = selectedSeats.length * sitPrice;
  const couponInput = document.getElementById("coupon-input").value;
  const discountPercentage = discountCodes[couponInput] || 0;
  const discountPrice = totalPrice * (1 - discountPercentage / 100);
  return discountPrice;
}
function updateTotalPrice() {
  const discountedPrice = calculateTotalPrice();
  const totalPrice = selectedSeats.length * sitPrice;
  const discountAmount = totalPrice - discountedPrice;
  const totalPriceElement = (document.getElementById("total-price").innerText =
    totalPrice);
  totalPriceElement.innerText = totalPrice;
  const discountPriceElement = (document.getElementById(
    "discount-price"
  ).innerText = discountAmount);
  const grandTotalPriceElement = (document.getElementById(
    "grand-total"
  ).innerText = totalPrice - discountAmount);
}
function handleClick(event) {
  const clickButton = event.target;
  if (clickButton.classList.contains("selected")) {
    return;
  }
  const selectedButton = document.querySelectorAll(".selected");
  if (selectedButton.length >= 4) {
    alert("You have already 4 seat selected");
    return;
  }
  // 1. seat serial
  const seatSerial = clickButton.innerText;
  const titleContainer = document.getElementById("seat-class-price");
  const p = document.createElement("p");
  p.innerText = serial + ". " + seatSerial;
  titleContainer.appendChild(p);
  serial++;
  // 2. class serial
  const classSerial = "Economoy";
  const classContainer = document.getElementById("class-seat-price");
  const p2 = document.createElement("p");
  p2.innerText = classSerial;
  classContainer.appendChild(p2);
  //3. price serial
  const priceContainer = document.getElementById("price-seat-class");
  const p3 = document.createElement("p");
  p3.innerText = sitPrice;
  priceContainer.appendChild(p3);
  clickButton.classList.add("selected");
  clickButton.style.backgroundColor = "#1dd100";
  clickButton.style.color = "white";
  const selectedSeat = clickButton.innerText;
  selectedSeats.push(selectedSeat);
  const selectedCount = selectedSeats.length;
  availableSeat--;
  document.getElementById("left-seat").innerText = availableSeat;
  document.getElementById("select-seat").innerText = selectedCount;
  updateTotalPrice();
}
document.getElementById("coupon-button").addEventListener("click", () => {
  console.log("click");
  const couponInput = document.getElementById("coupon-input").value;
  if (!(couponInput in discountCodes)) {
    alert("Invalid Coupon Code");
    return;
  }
  updateTotalPrice();
  document.getElementById("discount-content").style.display = "none";
});
document.querySelectorAll("#btn").forEach((button) => {
  button.addEventListener("click", handleClick);
});
