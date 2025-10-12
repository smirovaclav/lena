document.getElementById('makePdf').addEventListener('click', async () => {
  const invoice = document.getElementById('invoice');
  const logoSlot = document.getElementById('logoSlot');
  let total = 0;

  // spočítat celkovou cenu
  document.querySelectorAll('.row-item').forEach(row => {
    const qty = parseFloat(row.children[1].textContent.replace(/\D/g, '') || 0);
    const unit = parseFloat(row.children[2].textContent.replace(/\D/g, '') || 0);
    const subtotal = qty * unit;
    row.children[3].textContent = subtotal.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });
    total += subtotal;
  });

  document.getElementById('grandTotal').textContent = total.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });
  await buildQR(total);

  // === SCHOVÁNÍ RÁMEČKU LOGA ===
  const logoImg = logoSlot.querySelector('img');
  const hadImage = !!logoImg;

  // pokud je obrázek, border odstraníme, pokud není, border také odstraníme jen pro PDF
  const prevBorder = logoSlot.style.border;
  logoSlot.style.border = 'none';

  // generování PDF
  await html2pdf().set({
    margin: 0,
    filename: 'faktura.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(invoice).save();

  // === OBNOVENÍ RÁMEČKU ===
  if (!hadImage) {
    logoSlot.style.border = prevBorder; // pokud nebylo logo, border se obnoví
  }
});
