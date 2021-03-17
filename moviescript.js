const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
function updatecount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCounts = selectedSeats.length;
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
}
console.log(seats);
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
function setMovieData(movieIndex, movieValue) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', movieValue);
}
movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  updatecount();
  setMovieData(e.target.selectedIndex, e.target.value);
});
container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updatecount();
  }
});
updatecount();
