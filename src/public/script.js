const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatWrapper = document.getElementById('chat-wrapper');
const chatBox = document.getElementById('chat-box')

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  responseBot(userMessage)
  
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  const wrapper = document.createElement('div')
  wrapper.classList.add('message-wrapper',sender)
  wrapper.appendChild(msg)
  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function responseBot(userMessage) {
  const msg = document.createElement('div');
  msg.classList.add('message', 'bot');
  msg.textContent = 'Sabar bos botnya mikir dulu ...';
  const wrapper = document.createElement('div')
  wrapper.classList.add('message-wrapper','bot')
  wrapper.appendChild(msg)
  chatWrapper.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch('/generate-text',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
         role:'user',
         content:userMessage
      })
    })
    
    const data = await res.json()
    
    if(!res.ok){
      msg.textContent=data.message
    }
    msg.textContent = data.result

  } catch (error) {
    msg.textContent = 'Tidak bisa terhubung ke AI'
  } finally{
    chatBox.scrollTop = chatBox.scrollHeight
  }
}
