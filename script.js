document.getElementById('jurnalForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    bangunPagi: document.getElementById('bangunPagi').checked,
    jamBangun: document.getElementById('jamBangun').value,
    ibadah: {
      subuh: document.getElementById('subuh').checked ? document.getElementById('jamSubuh').value : null,
      dzuhur: document.getElementById('dzuhur').checked ? document.getElementById('jamDzuhur').value : null,
      ashar: document.getElementById('ashar').checked ? document.getElementById('jamAshar').value : null,
      maghrib: document.getElementById('maghrib').checked ? document.getElementById('jamMaghrib').value : null,
      isya: document.getElementById('isya').checked ? document.getElementById('jamIsya').value : null,
    },
    olahraga: document.getElementById('olahraga').checked,
    jamOlahraga: document.getElementById('jamOlahraga').value,
    menuMakan: document.getElementById('menuMakan').value,
    belajar: document.getElementById('belajar').checked,
    bermasyarakat: document.getElementById('bermasyarakat').checked,
    kegiatanMasyarakat: document.getElementById('kegiatanMasyarakat').value,
    tidurCepat: document.getElementById('tidurCepat').checked,
    jamTidur: document.getElementById('jamTidur').value,
    tanggal: new Date().toLocaleDateString()
  };

  localStorage.setItem('jurnalHariIni', JSON.stringify(data));
  tampilkanHasil(data);
});

function tampilkanHasil(data) {
  const ibadahList = Object.entries(data.ibadah)
    .filter(([_, jam]) => jam)
    .map(([sholat, jam]) => `${capitalize(sholat)} (${jam})`).join(', ');

  const hasil = `
    <h2>Rekap Jurnal: ${data.tanggal}</h2>
    <ul>
      <li>1. Bangun Pagi: ${data.bangunPagi ? '✅ Ya' : '❌ Tidak'} (${data.jamBangun})</li>
      <li>2. Ibadah: ${ibadahList || 'Tidak Beribadah'}</li>
      <li>3. Olahraga: ${data.olahraga ? '✅ Ya' : '❌ Tidak'} (${data.jamOlahraga})</li>
      <li>4. Makan Sehat: ${data.menuMakan}</li>
      <li>5. Belajar: ${data.belajar ? '✅ Ya' : '❌ Tidak'}</li>
      <li>6. Bermasyarakat: ${data.bermasyarakat ? '✅ Ya' : '❌ Tidak'} (${data.kegiatanMasyarakat})</li>
      <li>7. Tidur Cepat: ${data.tidurCepat ? '✅ Ya' : '❌ Tidak'} (${data.jamTidur})</li>
    </ul>
  `;

  document.getElementById('hasilJurnal').innerHTML = hasil;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Tampilkan data terakhir saat halaman dibuka
const lastData = localStorage.getItem('jurnalHariIni');
if (lastData) tampilkanHasil(JSON.parse(lastData));
