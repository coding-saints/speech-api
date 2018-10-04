const synth = window.speechSynthesis

//DOM elements
const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')
const body = document.querySelector('body')

//Browser identity

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined'

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore

// Init Arr
let voices = []

const getVoices = () => {
    voices = synth.getVoices()
    voices.forEach(voice => {
        //create option el
        const option = document.createElement('option')
        //add voice and lang to option
        option.textContent = voice.name + '('+ voice.lang + ')'
        // set attributes
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option)
    })
}
//Check Browser **bug**
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

//Speak
const speak = () => {
    //check if speaking
    if(synth.speaking) {
        console.error('already speaking')
        return
    }
  
    if(textInput.value !== '') {
          //Add animation
    body.style.background = '#141414 url(./wave.gif)'
    body.style.backgroundRepeat = 'repeat-x'
    body.style.backgroundSize = '100% 100%'

              // Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)

        // speak End
        speakText.onend = e => {
            console.log('Done Speaking...')
            body.style.background = '#141414'
        }
        //Speak ERROR
        speakText.onerror = e => {
            console.error('Something is WRONG...')
        }
        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        // Loop thru voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice
            }
        }) 

        //set pitch and rate
        speakText.rate = rate.value
        speakText.pitch = pitch.value
        //speak
        synth.speak(speakText)
        
    }
}

//Event Listeners

//text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault()
    speak()
    textInput.getBoundingClientRect()
})

//Rate Value Change
rate.addEventListener('change', e => (rateValue.textContent = rate.value))

//Pitch Value Change
rate.addEventListener('change', e => (pitchValue.textContent = pitch.value))

//voice select change
voiceSelect.addEventListener('change', e => speak())
