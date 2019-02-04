import { format } from "url";

// ------------------------ Variables -------------------------//

const textArea = document.querySelector('textarea');
const copyBtn = document.getElementById('copy-btn');

const charCountDemo = document.getElementById('char-count');
const wordCountDemo = document.getElementById('word-count');

const sentenceBtn = document.getElementById('sentence-btn');
const lowerBtn = document.getElementById('lower-btn');
const upperBtn = document.getElementById('upper-btn');
const titleBtn = document.getElementById('title-btn');
const alternatingBtn = document.getElementById('alternating-btn');
const inverseBtn = document.getElementById('inverse-btn');
const downloadBtn = document.getElementById('download-btn');
const clearBtn = document.getElementById('clear-btn');

//------------------------ Counter functions ------------------------- //

// Character Counter function
textArea.addEventListener('keyup', () => {
    let charArray = textArea.value.replace(/\s+/g, '').split('');
    let charCounter = charArray.length;
    charCountDemo.innerHTML = `Character count: ${charCounter}`;
});

// Word Counter function
textArea.addEventListener('keyup', () => {
    let wordArray = textArea.value.replace(/\s+/g, ' ').split(' ');
    let wordCounter = 0;

    wordArray.map(item => {
        if(item !== '') {
            wordCounter++;
        }
    })
    wordCountDemo.innerHTML = `Word count: ${wordCounter}`;
});

// ------------------------ Button Functions ------------------------- //

// Copy Button

copyBtn.addEventListener('click', () => {
    textArea.select();
    document.execCommand('copy');
    copyBtn.style.width = '120px';
    setTimeout(() => {
        copyBtn.innerHTML = '<p> Copied!</p>';
    }, 100);
    
    setTimeout(() => {
        copyBtn.style.width = '45px';
        copyBtn.style.paddingRight = '0';
    }, 2000);

    setTimeout(() => {
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
    }, 2150);

})

// Sentence Button

sentenceBtn.addEventListener('click', () => {
    const regExp = /(^\s*\w|[\.\!\?]\s*\w)/g;
    const firstLetterUpper = () => {
        let str = textArea.value.trim().toLowerCase().replace(regExp, (character) => {
            return character.toUpperCase();
        })

        return str
    };
    
    const convertToSentenceCase = () => {
        let theString = textArea.value;
        let newString = firstLetterUpper(theString);
        textArea.value = newString;
    };

    convertToSentenceCase();
});


// Lowercase Button

lowerBtn.addEventListener('click', () => {
    let str = textArea.value.toLowerCase().replace(/\s+/g, ' ');
    textArea.value = str;
});

// Uppercase Button

upperBtn.addEventListener('click', () => {
    let str = textArea.value.toUpperCase().replace(/\s+/g, ' ');
    textArea.value = str;
});

// Title Button

titleBtn.addEventListener('click', () => {
    let str = textArea.value.toLowerCase().replace(/\s+/g, ' ').split(' ');
    const resultArray = str.map( word => {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });
    textArea.value = resultArray.join(' ');
});

// Alternating Button

alternatingBtn.addEventListener('click', () => {
    let str = textArea.value;
    let splitArray = str.replace(/\s+/g, ' ').split('');
    let resultArray = [];
    splitArray.map( (item, index) => {
        if (index % 2 === 1) {
            item = item.toLowerCase();
            resultArray.push(item);
        } else {
            item = item.toUpperCase();
            resultArray.push(item);
        }
        textArea.value = resultArray.join('');
    })
});

// Inverse Button

inverseBtn.addEventListener('click', () => {
    let str = textArea.value;
    let splitArray = str.replace(/\s+/g, ' ').split('')
    let resultArray = []
    splitArray.map( (item, index) => {
        if (index % 2 === 0) {
            item = item.toLowerCase();
            resultArray.push(item);
        } else {
            item = item.toUpperCase();
            resultArray.push(item);
        }
        textArea.value = resultArray.join('');
    })
});

// Download Button

downloadBtn.addEventListener('click', () => {
    const str = textArea.value;
    const textFileAsBlob = new Blob([str], {type:'text/plain'});
    const fileNameToSaveAs = 'content.txt' //Filename

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if (window.URL != null)
    {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
});

// Clear Button

clearBtn.addEventListener('click', () => {
    textArea.value = '';
    charCountDemo.innerHTML = 'Character count: 0';
    wordCountDemo.innerHTML = 'Word count: 0';
});