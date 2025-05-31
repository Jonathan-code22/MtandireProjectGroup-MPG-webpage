
function renderPhotos(photos /*searchTerm = ''*/) {
  
let photosHTML = '';

photos.forEach((photos) => {
  photosHTML += `
    <div class = "photo-preview">
      <div class = gvh-row>
        <p class = "stakeholder-meeting-heading">
          ${/*highlight*/(photos.eventType /*, searchTerm*/)}
        </p>    
        <img class="gvh-photo" src = "${photos.image}">
      </div>
      <div class = "photo-info-grid">
        <div class="profile-picture-insidediv">
          <img class = "profile-picture" src="PHOTOS/Icon.png">
        </div>
        <div class="photo-info">
          <p class="photo-title">
              ${/*highlight*/(photos.title /*, searchTerm*/)}
            </p>  
            <p class = "photo-text">
              ${/*highlight*/(photos.description /*, searchTerm*/)}
            </p>         
            <p class="photo-author">
              ${/*highlight*/(photos.author /*, searchTerm*/)}
            </p>
         <div class="apps-button-container">
           <button class = "download-btn" onclick = "downloadImage('${photos.image}', '${photos.eventType}.png')">Download</button>
          <div class="tooltip">Click to download photo</div>
         </div>
        </div>
      </div>
    </div> 
  `;
 
});

document.querySelector('.js-photo-grid').innerHTML = photosHTML;
}

renderPhotos(photos);

const searchInput = document.querySelector('#searchBar');
const searchButton = document.querySelector('.js-search-button');
const voiceSearchButton = document.querySelector('.js-voice-search-button');
const listeningStatus = document.querySelector('.listeningStatus');

searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.toLowerCase();
  
  if (!searchTerm) {
    renderPhotos(photos);
    return
  }

  const filteredphotos = photos.filter(photo => 
    photo.eventType.toLowerCase().includes(searchTerm) || 
    photo.title.toLowerCase().includes(searchTerm) ||
    photo.description.toLowerCase().includes(searchTerm) ||
    photo.author.toLowerCase().includes(searchTerm)
    );
  renderPhotos (filteredphotos,searchTerm);

   if (filteredphotos.length === 0) {
    document.querySelector('.js-photo-grid').innerHTML = '<p class= "no-results">No results found 😢</p>';
    return
  }
});

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();

  if (!searchTerm) {
    renderPhotos(photos);
    return
  }

  const filteredphotos = photos.filter(photo => 
    photo.eventType.toLowerCase().includes(searchTerm) || 
    photo.title.toLowerCase().includes(searchTerm) ||
    photo.description.toLowerCase().includes(searchTerm) ||
    photo.author.toLowerCase().includes(searchTerm)
    );
  renderPhotos (filteredphotos);

  if (filteredphotos.length === 0) {
    document.querySelector('.js-photo-grid').innerHTML = '<p>No results found 😢</p>';
    return
  }
});

/*function highlight (text,searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp (`${searchTerm}`, 'gi');
  return text.replace(regex, 
    '<span class = "highlight">$1</span>'
  );
}*/

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  voiceSearchButton.addEventListener('click', () => {
    recognition.start();

    listeningStatus.style.display = 'block';
    });

  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    searchBar.value = voiceText;

    searchBar.dispatchEvent(new Event('keyup'));

    listeningStatus.style.display = 'none';
  };

  recognition.onerror = (event) => {
    console.error('voice recognition error:', event.error);

    listeningStatus.style.display = 'none';
  };

  recognition.onend = () => {
    listeningStatus.style.display = 'none';
  };
} else {
  alert("voice recognition not supported in this browser 😓");
  voiceSearchButton.disabled = true;
};

const downloadImage = (url,filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};

renderPhotos(photos);

document.getElementById('toggleBtn').addEventListener('click', () => {
  document.getElementById('sideBar').classList.toggle('collapsed');

  if (document.getElementById('sideBar').classList.contains('collapsed')){
    document.getElementById('toggleBtn').style.display = 'none';
  }
});

  document.querySelectorAll('.side-bar .sidebar-link img').forEach(icon => {
    icon.addEventListener('click', () => {
      if (document.getElementById('sideBar').classList.contains('collapsed')){
        document.getElementById('sideBar').classList.remove('collapsed');

        document.getElementById('toggleBtn').style.display = 'block';
      };
    });
  });


document.getElementById('year').textContent = new Date().getFullYear();
