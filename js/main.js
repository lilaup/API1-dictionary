//Example fetch using https://api.dictionaryapi.dev/api/v2/entries/en/<word>
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  // const choice = 'plunder';
  const choice = document.querySelector('input').value
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data[0]);
        // console.log(data[0].meanings[0].definitions);
        
        //audios
        const phoneticsArr = data[0].phonetics;  
        document.querySelector('#language').innerText = '';
        document.querySelector('#audio').innerText = '';
        phoneticsArr.forEach(element => {
          const audioSrc = element.audio;

          if(audioSrc !== ''){
            let language = audioSrc.slice(-6,-4);//get the 2 letters before .mp3 - country's pronunciation
            //https for audio
            console.log(language, audioSrc);
            document.getElementById('language').innerText += `${language}\r`;
            document.getElementById('audio').innerHTML += `<audio controls="controls" src = "${audioSrc}">\r`;
            ;
          }
        })
                
        //word
        document.querySelector('#word').innerText = choice;
        //clearing meaning area
        document.querySelector('#meaning').innerText = '';
        //meanings
        let arrMeanings = data[0].meanings;
      
      arrMeanings.forEach(element => {
        let arrDefinitions = element.definitions;
        document.querySelector('#meaning').innerText += `\r\r${element.partOfSpeech}\r`
        arrDefinitions.forEach((element,i) => {
          document.querySelector('#meaning').innerText += `\r${i+1}) ${element.definition}`;
        });
      });
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}