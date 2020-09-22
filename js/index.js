document.addEventListener('DOMContentLoaded', event => {
const monsterContainer = document.querySelector('#monster-container')

let pageNumber = 1
const fetchUrl = number => {
    let baseUrl = 'http://localhost:3000/monsters/?_limit=50&_page=${number}'
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
}

const renderMonsters = monsterArray => {
    for (monster of monsterArray) {
        const monsterDiv = document.createElement('div')
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
        <h1>${monster.name}</h1>
        <p>${monster.age}</p>
        ${monster.description}
    `

    monsterContainer.appendChild(monsterDiv)
    }
};

const removeChildren = () => {
    monsterContainer.querySelectorAll('div').forEach(el => el.remove());
}

const clickHandler = () => {
    document.addEventListener('click', event => {
        if (event.target.matches('#forward')) {
            removeChildren();
            pageNumber = parseInt(pageNumber) + 1;
            fetchUrl(pageNumber);
        } else if (event.target.matches('#back')) {
            removeChildren();
            pageNumber = parseInt(pageNumber) - 1;
            fetchUrl(pageNumber);
        };
    })
}

const formHandler = () => {
    const form = document.createElement('form')
    form.innerHTML = `
    <input type='text' name='name' id='name-input' placeholder='name'>
    <input type='number' name='age' id='age-input' placeholder='age'>
    <input type='text' name='bio' id='bio-input' placeholder='bio'>
    <input type='submit' value='Submit'>
`
monsterDiv.appendChild('form')

}

const submitForm = () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        const name = e.target.name.value
        const age = e.target.age.value
        const description = e.target.bio.value

        const monsterInfo = {
            name: name,
            age: age,
            description: description
        }

        addMonster(MonsterInfo)
    })
}

const addMonster = info => {
    let baseUrl =  `http://localhost:3000/monsters/?_limit=20&_page=${pageNumber}`

    options = {
        method: 'POST'.value,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(info)
    }

    fetch(baseUrl, options)
    .then(resp => resp.json())
    .then(data => createSingleMonster(data))
}

const createSingleMonster = monster => {
    const monsterDiv = document.createElement('div')
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
        <h1>${monster.name}</h1>
        <p>${monster.age}</p>
        ${monster.description}
    `

    monsterContainer.appendChild(monsterDiv)
}


fetchUrl(pageNumber)
clickHandler()
formHandler()
submitForm()
})