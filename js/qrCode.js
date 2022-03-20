const wrapper = document.querySelector('.wrapper'),
qrInput = wrapper.querySelector('.form input'),
generateBtn = wrapper.querySelector('.form button'),
qrImg = wrapper.querySelector('.qr-code img');

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = "Génération en cours..."
    qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=175x175&data=' + qrValue;
    
    qrImg.addEventListener('load', () => {
        wrapper.classList.add('active');  
        generateBtn.innerText = "Générer un QR code"
  
    });
    
});

qrInput.addEventListener('keyup', () => {
    if(!qrInput.value){
       wrapper.classList.remove('active');
    }
});