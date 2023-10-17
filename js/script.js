const textarea = document.querySelector('#textarea');
const textarea_display = document.querySelector('#textarea-display');
const twitterBtn = document.getElementById('twitter');
let selectStart = 0;
let selectEnd = 0;
let pastedValue = '';
let animation = 'animate__fadeInDown';

textarea.addEventListener('input', type);
textarea.addEventListener('paste', pasteText);
textarea.addEventListener('click', selectPositionReset);
textarea.addEventListener('select', getSelectPosition);

function type(e) {
  displayText(e);
}

function pasteText(e) {
  pastedValue = e.clipboardData.getData('text/plain');
}

function displayText(event) {
  let span = document.createElement('span');
  let node;
  if (event.data !== null) {
    node = document.createTextNode(event.data[event.data.length - 1]);
  } else {
    node = document.createTextNode(event.data);
  }

  const caretPosition = textarea.selectionStart;
  span.appendChild(node);

  if (event.data !== null && event.data !== undefined) {
    if (event.inputType !== 'insertFromPaste') {
      if (selectEnd - selectStart !== 0) {
        removeSelection();
      }
      span.classList.add('animate__animated');
      span.classList.add(animation);
      textarea_display.insertBefore(span, textarea_display.children[caretPosition - 1]);
    }
  } else {
    if (event.inputType === 'insertFromPaste') {
      if (selectEnd - selectStart !== 0) {
        removeSelection();
      }
      pastedValue.split('').map((char, index) => {
        let pasteSpan = document.createElement('span');
        let pastenode = document.createTextNode(char);
        pasteSpan.appendChild(pastenode);
        pasteSpan.classList.add('animate__animated');
        pasteSpan.classList.add('animate__bounceIn');
        textarea_display.insertBefore(pasteSpan, textarea_display.children[caretPosition - pastedValue.length + index]);
      });
    } else if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
      if (selectEnd - selectStart !== 0) {
        removeSelection();
      } else {
        textarea_display.removeChild(textarea_display.children[caretPosition]);
      }
    } else if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
      while (textarea_display.firstChild) {
        textarea_display.removeChild(textarea_display.lastChild);
      }
      textarea.value.split('').map((char, index) => {
        let pasteSpan = document.createElement('span');
        let pastenode = document.createTextNode(char);
        pasteSpan.appendChild(pastenode);
        textarea_display.insertBefore(
          pasteSpan,
          textarea_display.children[caretPosition - textarea.value.length + index]
        );
      });
    }
  }

  if (textarea.value.length !== textarea_display.children.length) {
    while (textarea_display.firstChild) {
      textarea_display.removeChild(textarea_display.lastChild);
    }
    textarea.value.split('').map((char, index) => {
      let correctSpan = document.createElement('span');
      let correctnode = document.createTextNode(char);
      correctSpan.appendChild(correctnode);
      textarea_display.insertBefore(correctSpan, textarea_display.children[index]);
    });
  }
}

function getSelectPosition() {
  selectStart = textarea.selectionStart;
  selectEnd = textarea.selectionEnd;
}

function changeAnimation(animationName, el, n) {
  resetButtonImage();
  let triggedUrlList = [
    'https://icons.craftwork.design/static/media/TextFill.5ebf694e54d1efe1db2cc525b72830cb.svg',
    'https://icons.craftwork.design/static/media/BoldFill.1a0205c7c88df1a4511f5fd1108e7dd6.svg',
    'https://icons.craftwork.design/static/media/ItalicFill.947c3ba520eb05a9062818a4eee82c1b.svg',
    'https://icons.craftwork.design/static/media/TextBlockFill.cf4536bfd8f0c7ed52f9860a8bc344ce.svg',
    'https://icons.craftwork.design/static/media/EraserFill.5fd183651ad3d51492f4e6c5b8683694.svg',
  ];
  el.setAttribute('src', triggedUrlList[n - 1]);
  animation = animationName;
}

function resetButtonImage() {
  let buttons = document.querySelectorAll('.text-tool-left > img');
  let urlList = [
    'https://icons.craftwork.design/static/media/Text.2730ce8be0a4c57bd56032cadaedfcc3.svg',
    'https://icons.craftwork.design/static/media/Bold.f8470ed7c9fe05f9dc263bf6b2a89a9f.svg',
    'https://icons.craftwork.design/static/media/Italic.8064c2bc51617afffbc97fa67b60a114.svg',
    'https://icons.craftwork.design/static/media/TextBlock.8b46ffb5bba3925271d206b2d588ba24.svg',
    'https://icons.craftwork.design/static/media/Eraser.b2517d9ec347e52a2b3db33988e9f78e.svg',
  ];
  for (let i = 0; i < urlList.length; i++) {
    buttons[i].setAttribute('src', urlList[i]);
  }
}

function selectPositionReset() {
  selectStart = 0;
  selectEnd = 0;
}

function removeSelection() {
  for (let i = 0; i < selectEnd - selectStart; i++) {
    textarea_display.removeChild(textarea_display.children[selectStart]);
  }
  selectPositionReset();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}
