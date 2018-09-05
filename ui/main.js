
fetch('dna.json').then(r => r.json()).then(dna => {
  const App = Holo.connect(dna)
  const {sampleEntryCreate, sampleEntryList} = App.sampleZome
  const greetingEntries = createExperimentalGreetings(App)

  const createAndList = i => {
    if (i < greetingEntries.length) {
      const entry = greetingEntries[i]
      sampleEntryCreate(entry)
        .then(sampleEntryList)
        .then(renderGreetingEntries)
        .then(() => createAndList(i + 1))
    }
  }

  createAndList(0)
})

const createExperimentalGreetings = App => {
  const vowels = ["a", "e", "i", "o", "u"]
  const greetingEntries = []
  vowels.forEach(v1 => {
    vowels.forEach(v2 => {
      const text = `H${v1}l${v2}!`
      greetingEntries.push({text})
    })
  })
  return greetingEntries
}

const renderGreetingEntries = entries => {
  const html = entries.map(e => `
    <li>
      <span class="greeting">${e.Entry.text}</span>
      <span class="hash">(${e.Hash})</span>
    </li>
  `).join('')

  document.getElementById('app').innerHTML = `
    <ul>${html}</ul>
  `
}
