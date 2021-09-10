const API = "http://localhost:3000";

var socketConnected = io(API, {
    query: {
      userId: 01,
      eventId: 91,
    },
});

socketConnected.on("data-change", (message) => {
    console.log("new data ", message);
    $("#list").append(`<p>${message.name} - ${message.age}</p>`)
});

const getUsers = () => {
    $.get(`${API}/users`, (res) => {
        const data = res.data;
        data.forEach(user => {
            $("#list").append(`<p>${user.name} - ${user.age}</p>`)
        });
    })
}

const add = () => {
    const name = $("#name").val();
    const age = $("#age").val();
    $.post(`${API}/users`, {
        name,
        age,
    })
}

getUsers();

