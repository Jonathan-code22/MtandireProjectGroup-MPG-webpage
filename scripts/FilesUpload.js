
function checkCode() {
  const code = document.getElementById('adminCode').value;
  if (code === 'Mtandire123') {
    document.getElementById('uploadSection').style.display = 'block';

  localStorage.setItem('uploadAccess', 'true');
  } else {
    alert('Wrong code ❌');
  }
};

function uploadMedia() {
  const input = document.getElementById('fileInput');
  const files = input.files;
  const preview = document.getElementById("preview");

  preview.innerHTML = "";

  if (!files.length) {
    alert("No files selected");
    return
  }

  for (let i = 0; i < files.length; i++){
    const  file = files[i];
    const fileURL = URL.createObjectURL(file);
    let element;

    if (file.type.startsWith("image/")) {
      element = document.createElement("img");
      element.src = fileURL;
      element.className = "preview-image";
    } else if (file.type.startsWith("video/9888")){
      element = document.createElement("video");
      element.src = fileURL;
      element.controls = true;
      element.className = "preview-video";
    } else{
      element = document.createElement("a");
      element.href = fileURL;
      element.target = "_blank";
      element.textContent = "📃 " + file.name;
    }

    preview.appendChild(element);
    console.log(`Uploading: ${file.name}`);

  }

  alert(`${files.length} file(s) ready for upload!`);
}

window.addEventListener('load', () => {
  if (localStorage.getItem('uploadAccess')=== 'true'){
    document.getElementById('uploadSection').style.display = 'block';
  }
});