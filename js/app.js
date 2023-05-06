const container = document.querySelector('.container')
const userInput = document.getElementById('userInput')
const submitBtn = document.getElementById('submit')
const downloadBtn = document.getElementById('download') 
const sizeOptions = document.querySelector('#sizeOptions') 
const BGColor = document.getElementById('BGColor') 
const FGColor = document.getElementById('FGColor') 
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

// Set size

sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value
})

//Set BG
BGColor.addEventListener('input', () => {
    BGColorChoice = BGColor.value
})

//Set FG
FGColor.addEventListener('input', () => {
    FGColorChoice = FGColor.value
})


//Formattage input 
const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g,"")
    return value
}

submitBtn.addEventListener('click', async() =>{
    container.innerHTML = ""
    //QRcode génération
    QR_CODE = await new QRCode(container,{
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    })

    //URL pour le DL
    const src = container.firstChild.toDataURL("image/png")
    downloadBtn.href = src
    let userValue = userInput.value
    try{
        userValue = new URL(userValue).hostname
    } catch(_) {
        userValue = inputFormatter(userValue)
        downloadBtn.download = `${userValue}QR`
        downloadBtn.classList.remove("hide")
    }
})

userInput.addEventListener('input', () => {
    if(userInput.value.trim().length < 1){
        submitBtn.disabled = true
        downloadBtn.href = ""
        downloadBtn.classList.add('hide')
    } else {
        submitBtn.disabled = false
    }
})

window.onload = () => {
    container.innerHTML = ""
    sizeChoice = 100
    sizeOptions.value = 100
    userInput.value = ""
    BGColor.value = BGColorChoice = "#ffffff"
    FGColor.value = FGColorChoice = "#EE7633"
    downloadBtn.classList.add('hide')
    submitBtn.disabled = true

}