console.log('Client side JS is working ')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    e.preventDefault()

    const url = 'http://localhost:3000/weather?address=' + search.value

    fetch(url).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})