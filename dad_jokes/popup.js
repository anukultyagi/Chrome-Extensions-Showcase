const jokeText = document.getElementById('jokeText')
const refBtn = document.getElementById('refreshBtn')

const jokeGenerator = async () => {
    const response = await fetch('https://icanhazdadjoke.com/slack').then(res => res.json())
    jokeText.innerHTML = response.attachments[0].text
    console.log(response);
}

refBtn.addEventListener('click', () => jokeGenerator())

jokeGenerator()