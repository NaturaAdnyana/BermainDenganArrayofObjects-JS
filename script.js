// set Variable
let user = [
  { id: 1, nama: "Elon Musk", perusahaan: "Tesla" },
  { id: 2, nama: "Jeff Bezos", perusahaan: "Amazon" },
  { id: 3, nama: "Bill Gates", perusahaan: "Microsoft" },
  { id: 4, nama: "Mark Zuckerberg", perusahaan: "Facebook" }
];
const CACHE_KEY = "Data User";

// Simpan ke localStorage
let userJSON = JSON.stringify(user);
localStorage.setItem(CACHE_KEY, userJSON);

// Ngambil div dengan id array
const arrayBox = document.getElementById('array');

// function buat render data ke html
const arrayBoxRender = (data, clickedIndex) => {
  let arrayBoxContent = `
    ${data.map((item, index) => `
      <div
        class="array-box ${index == 0 ? 'chosen-one' : ''} ${index <= clickedIndex && index != 0 ? 'runner-up' : ''}"
        ${index != 0 ? `onClick=setToFirst(${index})` : ''}
      >
        <span class="label">${item.id}</span>
        <h2>Nama : ${item.nama}</h2>
        <h3>perusahaan : ${item.perusahaan}</h3>
      </div>
    `).join('')}
  `;
  arrayBox.innerHTML = arrayBoxContent;

  // Kasi animasi warna pada div yg dipilih
  const chosenDiv = document.querySelector('.chosen-one');
  setTimeout(() => {
    chosenDiv.classList.remove('chosen-one');
  }, 500);
};

// Event saat div diklik
const setToFirst = (index) => {
  // Ambil dulu dari localStorage
  let userParse = JSON.parse(localStorage.getItem(CACHE_KEY));

  // Ambil index yang diklik
  let chosenIndex = index;

  // Seleksi data yang di pilih
  const chosenData = userParse.find((item, index) => {
    return index === chosenIndex;
  })

  // Kecualikan data yang di pilih
  const unchosenData = userParse.filter((item, index) => {
    return index !== chosenIndex;
  })

  // Set userParse dengan data unchosenData
  userParse = unchosenData;

  // Tambahkan data yang dipilih ke paling awal
  userParse.unshift(chosenData);

  // render data ke html
  arrayBoxRender(userParse, chosenIndex);

  // Simpan ke localstorage
  userJSON = JSON.stringify(userParse);
  localStorage.setItem(CACHE_KEY, userJSON);
}

window.addEventListener('load', () => {
  arrayBoxRender(user, 0);
});