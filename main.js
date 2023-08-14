// General
const scanBtn = document.getElementById("scanbtn");
const generateBtn = document.getElementById("generatebtn");
const scanDiv = document.getElementById("scandiv"); 
const generateDiv = document.getElementById("generatediv");

scanBtn.addEventListener("click", () => {
    scanBtnBas();
});

generateBtn.addEventListener("click", () => {
    generateBtnBas();
});

function scanBtnBas() {
    if (scanDiv.style.display === "none") {
        generateDiv.style.display = "none";
        scanDiv.style.display = "block";
    }
    scanBtn.style.backgroundColor = "#434242";
    scanBtn.style.color = "#F3EFE0";
    generateBtn.style.backgroundColor = "";
    generateBtn.style.color = "";
};

function generateBtnBas() {
    if (generateDiv.style.display === "none") {
        generateDiv.style.display = "block";
        scanDiv.style.display = "none";
    }
    generateBtn.style.backgroundColor = "#434242";
    generateBtn.style.color = "#F3EFE0";
    scanBtn.style.backgroundColor = "";
    scanBtn.style.color = "";
};

// Scan Section
const form = document.querySelector("form");
const fileInp = form.querySelector("input");
const infoText = form.querySelector("p");
const closeBtn = document.getElementById("close");
const copyBtn = document.getElementById("copy");

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        document.getElementById("firstscan").style.display = "none";
        form.querySelector("img").style.display = "block";
        document.getElementById("results").style.display = "block";
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code";
    });
}

form.addEventListener("click", () => fileInp.click());

closeBtn.addEventListener("click", () => {
    form.querySelector("img").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("firstscan").style.display = "block";
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

// Generate Section
const generatedQR = document.getElementById("generatedqrcode"); 
const generateBtn2 = document.getElementById("generatebtn2");
qrInput = document.getElementById("urlinput");
qrImg = document.querySelector(".qrcode");
let preValue;

qrInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    // generateBtn2.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        // generateBtn2.innerText = "Proceed";
        generatedQR.style.display = "block";
    });
    }
});

/*
generateBtn2.addEventListener("click", () => {
});
*/

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        preValue = "";
        generatedQR.style.display = "none";
    }
});
