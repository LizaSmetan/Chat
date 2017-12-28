
let socket = io('https://easycode-test-chat.herokuapp.com');

class Chat {
    setEvents() {
        socket.on('chatMessage', function (message, user) {
            chat.renderMessage(message, user);
        });
        socket.on('writeMessage', function (name) {
            console.log('writing', name)
        });

        messageForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (inputMessage.value === '') return console.log('Empty message');

            chat.sendMessage(inputMessage.value, userInfo);
            inputMessage.value = '';
        });

        inputMessage.addEventListener('keyup', function (e) {
            chat.writeMessage('by ' + userInfo.name);
        })
    }
    verify(user){
        // let socket = this._socket;
        let verify = new Promise(function (resolve, reject) {
            console.log(user)
            socket.emit('verify', user, function (err, res) {
                if (!err){
                    resolve(res);
                } else {
                    reject(error)
                }
            })
        })
        verify
            .then(user => {
                userInfo = user;
                localStorage.email = user.email;
                localStorage.name = user.name;
            })
            .then( () => {
                document.querySelector('#header .user-info .user-data .user-name').innerHTML = `${user.name}`;
                enterModal.hide();
            })
            .then(chat.getUsers)
            .then(chat.renderUsers)
            .then(chat.setEvents)
            .catch ( error => console.error(error))
    }
    getUsers(){
        return new Promise(function (resolve, reject) {
            socket.emit('getUsers', function (users) {
                if (!users) reject('Users not found');
                resolve(users);
            })
        })

    }
    sendMessage(msg, userInfo){
        socket.emit('chatMessage', msg, userInfo);
    }
    writeMessage(userName){
        socket.emit('writeMessage', userName);

    }
    renderUsers(users){
        let usersContainer = document.querySelector('.chat-rooms-list');
        users.forEach(function (user) {
            let userCard = `
                    <div class="chat-room-item d-flex align-items-center">
						<div class="chat-room-user-ava">
							<img src="img/chat-img.png" alt="">
							<span class="new-msg-count"></span>
						</div>
						<div class="chat-room-user-info">
							<span class="chat-room-user-name">${user.name}</span>
							<div class="chat-room-last-msg d-flex justify-content-between">
								<span class="last-msg">${user.lastMessage}</span>
								<span class="last-msg-time">1 min</span>
							</div>
							<span class="chat-room-user-status ${user.isOnline ? 'online' : 'offline'}"></span>
						</div>
					</div>
        `;
            usersContainer.insertAdjacentHTML('beforeend', userCard);
        })
    }
    renderMessage(message, user){
        let messageContainer = document.querySelector('.message-container');
        let messageCard = document.createElement('div');
        messageCard.classList.add('message');
        if (userInfo.name === user.name && userInfo.email === user.email){
            messageCard.classList.add('from-you');
        } else {
            messageCard.classList.add('to-you');
        }
        messageCard.innerHTML = `<img src="img/chat-img.png">
                            <div class="message-text">${message}</div>`;
        messageContainer.appendChild(messageCard);
    }
}