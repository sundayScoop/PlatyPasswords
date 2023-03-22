import {encryptData, decryptData} from "https://cdn.jsdelivr.net/gh/tide-foundation/Tide-h4x2-2@main/H4x2-Node/H4x2-Node/wwwroot/modules/H4x2-TideJS/Tools/AES.js";
import {BigIntToByteArray} from "https://cdn.jsdelivr.net/gh/tide-foundation/Tide-h4x2-2@main/H4x2-Node/H4x2-Node/wwwroot/modules/H4x2-TideJS/Tools/Utils.js";

const btn_a = document.querySelector('.addbtn');
btn_a.addEventListener('click', add);

const btn_l = document.querySelector('.logoutbtn');
btn_l.addEventListener('click', (click) => {
    window.localStorage.removeItem("CVK");
    window.localStorage.removeItem("UID");
    window.location.replace(window.location.origin);
});
refresh()
async function refresh(){
    var cvk = window.localStorage.getItem("CVK");
    const uid = window.localStorage.getItem("UID");

    if(cvk === null || uid === null){
        alert("CVK/UID not found, please log in first")
        window.location.replace(window.location.href + "index.html");
        return;
    }

    cvk = BigIntToByteArray(BigInt(cvk));

    const resp = await fetch(window.location.origin + `/user/getdata?uid=${uid}`);
    const text = await resp.text();
    if(text !== "--FAILED--"){
        const encryptedData = JSON.parse(text); // array of encrypted data
    
        var table = document.getElementById("tbl");
        var tbody = table.getElementsByTagName("tbody")[0];

        // Loop through the data and create a new row for each item
        for (var i = 0; i < encryptedData.length; i++) {
            const decryptedData = await decryptData(encryptedData[i], cvk);
            const decryptedObj = JSON.parse(decryptedData); // {password, website}

            // Create a new row and cells
            var row = document.createElement("tr");
            var passwordCell = document.createElement("td");
            var websiteCell = document.createElement("td");

            // Set the text content of the cells to the data values
            passwordCell.textContent = decryptedObj.password;
            websiteCell.textContent = decryptedObj.website;

            // Append the cells to the row
            row.appendChild(passwordCell);
            row.appendChild(websiteCell);

            // Append the row to the tbody
            tbody.appendChild(row);
        }
    }
    

}

async function add(){
    var cvk = window.localStorage.getItem("CVK");
    const uid = window.localStorage.getItem("UID");

    if(cvk === null || uid === null){
        alert("CVK/UID not found, please log in first")
        window.location.replace(window.location.origin + "/index.html");
    }

    cvk = BigIntToByteArray(BigInt(cvk));

    var pass = document.getElementById("new-pass").value;
    var website = document.getElementById("website").value;
    const plainDataEntry = JSON.stringify({
        password: pass,
        website: website
    });
    const encryptedDataEntry = await encryptData(plainDataEntry, cvk);

    const form = new FormData();
    form.append("data", encryptedDataEntry);
    const resp = await fetch(window.location.origin + `/user/addData?uid=${uid}`, {
        method: 'POST',
        body: form
    });
    if(!resp.ok) alert("Something went wrong with adding new passowrd");
    else location.reload();
}