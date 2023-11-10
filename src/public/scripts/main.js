// class App {
//   constructor() {
//     // get element form search car
//     this.formSearchCar = document.getElementById('searchCar');
//     this.resultCar = document.getElementById('resultCar');
//   }

//   init() {
//     const typeDriver = document.getElementById('driver');
//     const date = document.getElementById('date');
//     const pickupTime = document.getElementById('pickupTime');
//     const totalPassenger = document.getElementById('totalPassenger');
//     const submitButton = document.getElementById('cariMobil');

//     typeDriver.addEventListener('change', enableSubmitButton);
//     date.addEventListener('input', enableSubmitButton);
//     pickupTime.addEventListener('change', enableSubmitButton);
//     totalPassenger.addEventListener('input', enableSubmitButton);

//     function enableSubmitButton() {
//       if (
//         typeDriver.value !== 'Pilih Tipe Driver' &&
//         date.value !== '' &&
//         pickupTime.value !== 'Pilih Waktu' &&
//         totalPassenger.value !== ''
//       ) {
//         submitButton.removeAttribute('disabled');
//       } else {
//         submitButton.setAttribute('disabled', true);
//       }
//     }

//     this.formSearchCar.addEventListener('submit', (e: any) => this.filterCars(e));
//   }

//   async filterCars(e) {
//     // menjaga page tidak ter-refresh saat button submit
//     e.preventDefault();
//     // set cars null
//     let cars = null;
//     // fetch data json
//     const response = await fetch('https://raw.githubusercontent.com/mizzcode/challenge_4/main/data/cars.min.json');
//     // olah data json ke object asli
//     const body = await response.json();
//     // ubah availableAt menjadi unix timestamp
//     cars = this.populateCars(body);
//     // input tanggal
//     const date = document.getElementById('date').value;
//     // input jam jemput/ambil
//     const pickupTime = document.getElementById('pickupTime').value;
//     // ubah tanggal+jam ke unix timestamp
//     const rentalDate = new Date(date + pickupTime).getTime();
//     // input jumlah penumpang
//     const totalPassenger = parseInt(document.getElementById('totalPassenger').value);

//     // filter availableAt/Tanggal Tersedianya lebih dari Waktu Sewa.
//     const availableCars = cars.filter((car) => car.availableAt > rentalDate);

//     this.resultCar.innerHTML = '';

//     // mencari mobil dengan kapasitas terbesar
//     const maxCarCapacity = Math.max(...availableCars.map((car) => car.capacity));

//     let foundCar = true;

//     availableCars.forEach((car) => {
//       const carElement = this.makeCars(car);

//       if (totalPassenger >= maxCarCapacity || totalPassenger < 1) {
//         if (foundCar) {
//           window.alert(`Mobil dengan penumpang ${totalPassenger} tidak tersedia`);
//           foundCar = false;
//         }
//         return;
//       }

//       if (car.capacity > totalPassenger) this.resultCar.append(carElement);
//     });
//   }

//   populateCars(cars) {
//     return cars.map((car) => {
//       const isPositive = this.getRandomInt(0, 1) === 1;
//       const timeAt = new Date();
//       const mutator = this.getRandomInt(1000000, 100000000);
//       const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator));

//       return {
//         ...car,
//         availableAt,
//       };
//     });
//   }

//   getRandomInt(min: number, max: number) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   // method format number to rupiah idr currency
//   rupiah(number: number) {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       maximumFractionDigits: 0,
//       minimumFractionDigits: 0,
//     }).format(number);
//   }

//   makeCars(car) {
//     const divCol = document.createElement('div');
//     divCol.classList.add('col');
//     divCol.classList.add('mb-4');

//     const divCard = document.createElement('div');
//     divCard.classList.add('card');
//     divCard.classList.add('h-100');
//     divCard.classList.add('p-2');

//     const divCardBody = document.createElement('div');
//     divCardBody.classList.add('card-body');

//     const divCar = document.createElement('div');
//     divCar.classList.add('car');

//     const img = document.createElement('img');
//     img.setAttribute('src', `${car.image}`);
//     img.setAttribute('width', '100%');

//     const typeCar = document.createElement('h6');
//     typeCar.classList.add('mt-4');
//     typeCar.innerText = `${car.type}`;

//     const rentalPerDay = document.createElement('h5');
//     rentalPerDay.classList.add('my-3');
//     const price = `${car.rentPerDay}`;
//     rentalPerDay.innerText = `${this.rupiah(price)} / hari`;

//     const description = document.createElement('p');
//     description.innerText = `${car.description}`;

//     const capacity = document.createElement('p');
//     capacity.innerHTML = `<i class='fi-users'></i> ${car.capacity} orang`;

//     const transmission = document.createElement('p');
//     transmission.innerHTML = `<i class='fi-settings'></i> ${car.transmission}`;

//     const year = document.createElement('p');
//     year.innerHTML = `<i class='fi-calendar'></i> Tahun ${car.year}`;

//     const divButton = document.createElement('div');
//     divButton.classList.add('d-flex');
//     divButton.classList.add('justify-content-center');
//     divButton.classList.add('align-items-center');

//     const button = document.createElement('button');
//     button.classList.add('btn');
//     button.classList.add('btn-success');
//     button.classList.add('p-3');
//     button.classList.add('mb-3');
//     button.classList.add('fw-bold');
//     button.style.width = '92%';
//     button.innerText = 'Pilih Mobil';

//     divCar.append(img, typeCar, rentalPerDay, description, capacity, transmission, year);

//     divCardBody.appendChild(divCar);

//     divButton.appendChild(button);

//     divCard.append(divCardBody, divButton);

//     divCol.appendChild(divCard);

//     return divCol;
//   }
// }

// const app = new App();
// app.init();
