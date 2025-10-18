const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatWrapper = document.getElementById('chat-wrapper');
const chatBox = document.getElementById('chat-box');
const fileInput = document.getElementById('file-input');
const attachWrapper = document.getElementById('attach-file-wrapper');
const btnSubmit = document.getElementById('btn-submit')

// jalankan pertama kali
updateAttachVisibility();

// welcome bot
appendWelcomeBot()

// jalankan lagi setiap kali user pilih / hapus file
fileInput.addEventListener('change',() => {
  updateAttachVisibility();
  appendFile(fileInput)
  checkDisabled()
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage && fileInput.files.length === 0) return; // kalau kosong semua, jangan kirim
  appendMessageWrapper('user', fileInput)
  appendMessage('user', userMessage);
  appendBotMessage(userMessage,fileInput)
  
 
  // reset form
  input.value = '';
  clearAttachments()
});

function checkDisabled(){
  if (!userMessage && fileInput.files.length === 0){
    btnSubmit.setAttribute('disabled','')
  } else{
    btnSubmit.removeAttribute('disabled')
  }
}

function updateAttachVisibility() {
  if (fileInput.files.length === 0) {
    attachWrapper.style.display = 'none';
  } else {
    attachWrapper.style.display = 'flex';
  }
}

function clearAttachments() {
  attachWrapper.innerHTML = ''; // hapus semua item dari DOM
  fileInput.value = '';          // reset input
  updateAttachVisibility();      // sembunyikan wrapper
}

function appendMessageWrapper(sender, fileInput) {
  if (fileInput.files.length === 0) return;

  const file = fileInput.files[0]; // ambil file pertama

  const itemFile = document.createElement('div');
  itemFile.classList.add('item-file');
  itemFile.textContent = file.name; // tampilkan nama file

  const fileDiv = document.createElement('div');
  fileDiv.classList.add('message', sender);
  fileDiv.appendChild(itemFile);

  const wrapper = document.createElement('div');
  wrapper.classList.add('message-wrapper', sender);
  wrapper.appendChild(fileDiv);

  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;

  const wrapper = document.createElement('div');
  wrapper.classList.add('message-wrapper', sender);
  wrapper.appendChild(msg);

  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendFile(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;

  const name = file.name.split('.')[0];
  const format = file.name.split('.')[1];

  // buat elemen
  const nameItem = document.createElement('p');
  nameItem.classList.add('name-item');
  nameItem.textContent = name;

  const delButton = document.createElement('button');
  delButton.classList.add('del-button-item');
  delButton.textContent = 'X';
  delButton.addEventListener('click', (e)=>{
    delItem(e);
    updateAttachVisibility();
  })

  const formatItem = document.createElement('p');
  formatItem.classList.add('format-item');
  formatItem.textContent = format;

  const sizeItem = document.createElement('p');
  sizeItem.classList.add('size-item');
  sizeItem.textContent = `${file.size/1000} kb`;

  // wrapper deskripsi
  const descriptionWrapper = document.createElement('div');
  descriptionWrapper.classList.add('desc-wrapper');
  descriptionWrapper.appendChild(nameItem);
  descriptionWrapper.appendChild(delButton);

  // wrapper format
  const formatWrapper = document.createElement('div');
  formatWrapper.classList.add('format-wrapper');
  formatWrapper.appendChild(formatItem);
  formatWrapper.appendChild(sizeItem);

  // item utama
  const newItem = document.createElement('div');
  newItem.classList.add('item');
  newItem.id = 'item'; // bisa diganti ID unik jika perlu
  newItem.appendChild(descriptionWrapper);
  newItem.appendChild(formatWrapper);

  // tambahkan ke attachWrapper
  attachWrapper.appendChild(newItem);
}

function delItem(event){
    // hapus parent item dari DOM
  const item = event.target.closest('.item'); // cari div.item terdekat

  if (item) item.remove();
  fileInput.value = ''
  console.log(fileInput.files)
}

function appendWelcomeBot(){
  const text = `Halo bro! Selamat datang di bot si paling HRD.
Biar kamu bisa dapet penilaian optimal untuk CV mu, jadi isi promptnya kayak gini ya :

  - Industri yang Dituju : [Contoh: Teknologi, F&B, Kesehatan, Manufaktur]
  - Posisi yang Dituju : [Contoh: Social Media Specialist, Account Executive, Teknisi Listrik]
  - Deskripsi Loker : [Contoh: butuh orang yang jago JS dan jago docker (Biar gampang copy aja udah deskripsi lokernya)]`

  const msg = document.createElement('div');
  msg.classList.add('message', 'bot');
  msg.textContent = text;

  const wrapper = document.createElement('div');
  wrapper.classList.add('message-wrapper', 'bot');
  wrapper.appendChild(msg);
  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function appendBotMessage(userMessage,fileInput){
  const msg = document.createElement('div');
  msg.classList.add('message', 'bot');
  msg.textContent = 'Bot hrd tampan berpikir dulu ...';

  const wrapper = document.createElement('div');
  wrapper.classList.add('message-wrapper', 'bot');
  wrapper.appendChild(msg);
  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetchData(userMessage,fileInput)
    const data = await res.json()
    if (!res.ok){
      console.log({
        status:data.status,
        message:data.message
      })
      msg.textContent = data.message
    }
    msg.textContent = data.result
  } catch (error) {
    msg.textContent = 'Servernya gamau nyambung bro ada yang salah nih'
  }
}

async function fetchData(userMessage, fileInput) {
  const formData = new FormData();
  formData.append("content", userMessage); // isi teks user
  if (fileInput.files.length > 0) {
    formData.append("doc", fileInput.files[0]); // kirim file juga
  }

  const response = await fetch("/generate-from-document", {
    method: "POST",
    body: formData, // browser otomatis handle Content-Type
  });

  return response;
}

