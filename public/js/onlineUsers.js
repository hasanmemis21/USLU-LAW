const socket = io();

socket.emit('user_connected', {
    id: user.id, // Kullanıcı ID'si
    name: user.name, // Kullanıcı Adı
    role: user.role, // Kullanıcı Rolü (admin veya normal user)
    email: user.email // Kullanıcı Email'i
});

socket.on('onlineUsers', (onlineUsers) => {
    console.log('Online Users:', onlineUsers);
});
