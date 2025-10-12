async function buildQR(total){
  const accN = '222785210';
  const bank = '0600';
  const vs = '2025001';
  const currency = 'CZK';
  const msg = 'Faktura';
  const url = `https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${accN}&bankCode=${bank}&amount=${total.toFixed(2)}&currency=${currency}&vs=${vs}&message=${msg}`;
  try{
    const res = await fetch(url,{mode:'cors'});
    const blob = await res.blob();
    const reader = new FileReader();
    const dataUrl = await new Promise(ok=>{reader.onload=()=>ok(reader.result);reader.readAsDataURL(blob)});
    document.getElementById('qrImg').src = dataUrl;
  }catch(err){
    document.getElementById('qrImg').src = url;
  }
}
