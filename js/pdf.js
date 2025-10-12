document.getElementById('makePdf').addEventListener('click', async()=>{
  const invoice = document.getElementById('invoice');
  let total=0;
  document.querySelectorAll('.row-item').forEach(row=>{
    const qty = parseFloat(row.children[1].textContent.replace(/\D/g,'')||0);
    const unit = parseFloat(row.children[2].textContent.replace(/\D/g,'')||0);
    const subtotal = qty*unit;
    row.children[3].textContent = subtotal.toLocaleString('cs-CZ',{style:'currency',currency:'CZK'});
    total += subtotal;
  });
  document.getElementById('grandTotal').textContent = total.toLocaleString('cs-CZ',{style:'currency',currency:'CZK'});
  await buildQR(total);
  html2pdf().set({
    margin: 0,
    filename:'faktura.pdf',
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:2,useCORS:true},
    jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}
  }).from(invoice).save();
  });
  document.getElementById('logoSlot').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoSlot = document.getElementById('logoSlot');
        logoSlot.innerHTML = `<img src="${event.target.result}" alt="Logo">`;
      };
      reader.readAsDataURL(file);
    };
    input.click();
});
