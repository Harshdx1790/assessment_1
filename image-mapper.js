
//Global Variables 
let listData = [];
let xCoordinate = 0;
let yCoordinate = 0;
//end of Global Variables 
const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById('dimension').innerHTML = img.width + " X " + img.height
            document.getElementById('name').innerHTML = e.target.files[0].name
            document.getElementById('type').innerHTML = e.target.files[0].type
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);

}

const clickHotspotImage = (event) => {
    console.log(event)
    let containerWidth = document.getElementById("canvas-container").offsetWidth
    let containerHeight = document.getElementById("canvas-container").offsetHeight
    xCoordinate = Math.round((event.offsetX) * (canvas.width / containerWidth))
    yCoordinate = Math.round(event.offsetY * (canvas.height / containerHeight))
    document.querySelector("#modal-dialog").showModal()
    drawPixel(xCoordinate, yCoordinate, 255, 0, 0, 255);

}

const dialogSubmit = () => {
    console.log(document.getElementById("description").value);
    let listMap = {}
    listMap["xPos"] = xCoordinate
    listMap["yPos"] = yCoordinate
    listMap["Description"] = document.getElementById("description").value
    listData.push(listMap)
    descTable(listData)
}

const descTable = (listData) => {
    let keys = Object.keys(listData[0])

    let html = "";
    html += "<table>"
    html += "<tr>"
    keys.forEach((item, index) => {
        html += "<th>" + item + "</th>"
    })
    html += "</tr>"
    listData.forEach((item) => {
        html += "<tr>"
        keys.forEach((key, index) => {
            html += "<td>" + item[key] + "</td>"
        })
        html += "</tr>"
    })

    html += "</table>"
    document.getElementById("desc-table").innerHTML = html
}

const drawPixel = (x, y, r, g, b, a) => {
    console.log(x + "::" + y)
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()

    // ctx.fillRect(x,y,10,10);
}

const handleMouseMove = (e) => {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    console.log(e.offsetX + "::" + e.offsetX)
    let containerWidth = document.getElementById("canvas-container").offsetWidth
    let containerHeight = document.getElementById("canvas-container").offsetHeight
    let xCor = Math.round((e.offsetX) * (canvas.width / containerWidth))
    let yCor = Math.round(e.offsetY * (canvas.height / containerHeight))

    var hit = false;
    listData.forEach((item, index) => {
        let dx = item.xPos
        let dy = item.yPos
        console.log(Math.abs(item.xPos - xCor))
        if (Math.abs(item.xPos - xCor) < 20) {
            tipCanvas.style.left = (e.clientX) + "px";
            tipCanvas.style.top = (e.clientY + 10) + "px";
            tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
            tipCtx.fillText(item.Description, 5, 15);
            hit = true;
        }

    })
    if (!hit) {
        tipCanvas.style.left = "-200px";
    }

}


const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const tipCanvas = document.getElementById("tip");
const tipCtx = tipCanvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
const offsetX = rect.left;
const offsetY = rect.top;
imageLoader.addEventListener('change', handleImageUpload, false);
canvas.addEventListener('click', clickHotspotImage, false);
const dialog = document.getElementById('modal-dialog');
const confirmBtn = dialog.querySelector('#confirmBtn');
confirmBtn.addEventListener('click', dialogSubmit, false)
canvas.addEventListener('mousemove', handleMouseMove, false);