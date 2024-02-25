const baseUrl = "http://127.0.0.1:8000/api/"
// const userDetails = JSON.parse(localStorage.getItem('userDetails'))
export function getMoviesData(userDetails) {
    return fetch(baseUrl + "movieview/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 401) {
                return (response.json())
            } else {
                return (response.status)
            }
        })
        .catch((err) => {
            return (err)
        })
}
export function RegisterUser(user) {
    return fetch(baseUrl + "register/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return (response.status)
        })
        .catch((err) => {
            return (err)
        })
}
export function LoginUser(user) {
    return fetch(baseUrl + "login/", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })
}
export function getCity(userDetails){
    return fetch(baseUrl + "city/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 401) {
                return (response.json())
            } else {
                return (response.status)
            }
        })
        .catch((err) => {
            return (err)
        })
}
export function getTheater(userDetails,name){
    return fetch(baseUrl + "theater/"+name, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 401) {
                return (response.json())
            } else {
                return (response.status)
            }
        })
        .catch((err) => {
            return (err)
        })
}

export function Bookticket(ticket, userDetails) {
    return fetch(baseUrl + "booking/", {
        method: "POST",
        body: JSON.stringify(ticket),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })

}
export function BookedSeat(ticket,movie,userDetails){
    return fetch(baseUrl + "bookedseat/", {
        method: "POST",
        body: JSON.stringify({    
            "movie":movie,
            "time":ticket.time,
            "date":ticket.date,
            "theater":ticket.theater,
            "city":ticket.city
        
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })
}

export function UserUpdate(access,user,id){
    return fetch(baseUrl + "userupdate/"+id, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })
}
export function UserTickets(access,id){
    return fetch(baseUrl + "usertickets/"+id, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })
}
export function Search(search){
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    return fetch(baseUrl + "moviesearch/", {
        method: "POST",
        body: JSON.stringify({search}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userDetails.access
        },
    })
        .then((response) => {
            if (response.status !== 400) {
                return (response.json())
            } else {
                return (response.status)
            }

        })
        .catch((err) => {
            return (err)
        })
}
