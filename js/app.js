let enterModal = new Modal('#enter-modal');

let chat = new Chat();

let enterForm = document.forms['enter-form'];
let messageForm = document.forms['message-form'];
let inputMessage = messageForm.elements['message'];

let userInfo = {};
socket.on('connection', function () {

    if (localStorage.email && localStorage.name){
        chat.verify({email : localStorage.email, name : localStorage.name})
    } else {
        enterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if(this.elements['email'].value === '' && this.elements['name'].value === '') return console.log('Empty form');
            userInfo['email'] = this.elements['email'].value;
            userInfo['name'] = this.elements['name'].value;

            chat.verify(userInfo)
        });
    }
});









