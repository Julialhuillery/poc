function elem(selector, parent = document){
  let elem = document.querySelector(selector);
  return elem != false ? elem : false;
}

function elems(selector) {
  let elems = document.querySelectorAll(selector);
  return elems.length ? elems : false; 
}

function pushClass(el, targetClass) {
  // equivalent to addClass
  if (el && typeof el == 'object' && targetClass) {
    elClass = el.classList;
    elClass.contains(targetClass) ? false : elClass.add(targetClass);
  }
}

function deleteClass(el, targetClass) {
  // equivalent to removeClass
  if (el && typeof el == 'object' && targetClass) {
    elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
  }
}

function modifyClass(el, targetClass) {
  // equivalent to toggleClass
  if (el && typeof el == 'object' && targetClass) {
    elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
  }
}

function containsClass(el, targetClass) {
  if (el && typeof el == 'object' && targetClass) {
    return el.classList.contains(targetClass) ? true : false;
  }
}

(function decorateContacts() {
  let contacts = elems('.contact');
  if (contacts) {
    contacts.forEach(contact => {
      let icons = contact.querySelectorAll('img');
      icons.forEach(icon => {
        let heading = icon.parentNode;
        pushClass(heading, 'contact_decorate');
        pushClass(icon, 'contact_icon');
      }); 
    });
  }
})();

// modify menu
(function modifyMenu() {
  let button = document.querySelector('.menu_toggle');
  let menu = document.querySelector('.nav_menu');
  let nav = document.querySelector('.nav_header');
  let open = 'nav_open';
  let expand = 'nav_expanded';
  function modifyMenuItems() {
    modifyClass(nav, expand);
    modifyClass(menu, open);
    containsClass(menu, open) ? button.innerHTML = '&times;' : button.innerHTML = '&#9776;';
  }
  button.addEventListener('click', function(event) {
    modifyMenuItems();
  });
  nav.addEventListener('click', function(event) {
    event.target == this ? modifyMenuItems() : false;
  });
})();

(function() {
  let items = elems('.share_item');

  (function shareItem() {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');  // Create a <textarea> element
      el.value = str;                                 // Set its value to the string that you want copied
      el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
      el.style.position = 'absolute';                 
      el.style.left = '-9999px';                      // Move outside the screen to make it invisible
      document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
      const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0)     // Store selection if found
          : false;                                    // Mark as false to know no selection existed before
      el.select();                                    // Select the <textarea> content
      document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el);                  // Remove the <textarea> element
      if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
      }
      const copyText = document.createElement('div');
      copyText.classList.add('share_copy');
      copyText.innerText = 'Link Copied';
      // check if there's another notification
      let shareItems = Array.from(elem('.share').children);
      let shareLength = shareItems.length;
      let lastIndex = shareLength - 1;
      let lastShareItem = shareItems[lastIndex];
      if(lastShareItem.classList.contains('share_copy') == false) {
        elem('.share').appendChild(copyText);
        setTimeout(function() { 
          elem('.share').removeChild(copyText)
        }, 4000);
      }
    };

    elem('main').addEventListener('click', function(event) {
      let shareTrigger = event.target.closest('.share_item');
      if(shareTrigger) {
        let copyclass = shareTrigger.classList.contains('copy') ? true : false;
        let shareSrc = shareTrigger.href;
        event.preventDefault();
        if(copyclass) {
          copyToClipboard(shareSrc);
        } else {
          window.open(shareSrc, 'mywin','left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
        }
      }
    });
  })();
})();

(function autoResizeTextField() {
  let textarea = document.querySelector('textarea');
  textarea ? autosize(textarea) : false;
})();

// Replaces bootstrap carousel
(function Slider() {
  function activateSlide(el, position, direction) {
    let allSlides = Array.from(el);
    let active = 'slide_active';
    let activeSlide = allSlides.filter((slide) => {
      return slide.classList.contains(active);
    })[0];
    
    let currentPosition = allSlides.indexOf(activeSlide);
    // number of slides 
    let size = allSlides.length;
    
    function switchDot(position) {
      let active = 'dot_active';
      let dots = Array.from(activeSlide.parentNode.nextElementSibling.children);
      let activeDot = dots[currentPosition]; 
      let targetDot = dots[position];
      deleteClass(activeDot, active);
      pushClass(targetDot, active);
    }
    
    function switchSlide (position) {
      let targetSlide = allSlides[position];
      switchDot(position);
      deleteClass(activeSlide, active);
      pushClass(targetSlide, active);
    }
    
    function arrows() {
      // Get the position of the active Slide
      if(direction === 1) {
        if(currentPosition >= 0 && currentPosition !== (size - 1)) {
          let position = (currentPosition + 1);
          switchSlide(position);
        } else {
          let position = 0;
          switchSlide(position);
        }
      } else {
        if(currentPosition !== 0) {
          let position = (currentPosition - 1);
          switchSlide(position);
        } else {
          let position = (size - 1);
          switchSlide(position);
        }
      }
    }
    
    function dots() {
      switchSlide(position);
    }
    
    position === undefined ? arrows() : dots();
    
  }
  
  let mainSection = document.querySelector('main');
  
  mainSection.addEventListener('click', function(event) {
    let dot = event.target.closest('.dot');
    let direction = event.target.closest('.direction');
    let left = event.target.closest('.slide_left');
    let right = event.target.closest('.slide_right');
    
    if (dot) {
      let dots = dot.parentNode.children;
      let slides = dot.parentNode.previousElementSibling.children;
      let position = Array.from(dots).indexOf(dot);
      activateSlide(slides, position, undefined);
    }
    
    if(left || right) {
      let slides = direction.previousElementSibling.previousElementSibling.children;
      left ? activateSlide(slides, undefined, 0) : right ? activateSlide(slides, undefined, 1) : false ;
    }
  });
  
  mainSection.addEventListener('keydown', function(event) {
    let slides = Array.from(event.target.children);
    if(slides) {
      let direction = event.code.toLowerCase() === 'arrowleft' ?  0 : (event.code.toLowerCase()  === 'arrowright' ? 1 : undefined); 
      if (direction !== undefined ) {
        direction === 0 ? activateSlide(slides, undefined, 0) : activateSlide(slides, undefined, 1) ;
      }
    }
  });
  
  function autoPlaySlide (speed) {
    window.setInterval(function() {
      let sliders = Array.from(document.querySelectorAll('.slides'));
      if(sliders) {
        sliders.forEach((slider) => {
          activateSlide(slider.children, undefined, 1);
        });
      }
    }, speed);
  }
  
  autoPlaySlide(10000);  
  
})();

function smoothScroll(element, to, duration) {
  if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

(function showContacts() {
  let contact = document.querySelector('#contact');
  let contactButton = document.querySelector('.contact_btn');
  if(contactButton) {
    contactButton.addEventListener('click', function() {
      contact ? smoothScroll(document.body, contact.offsetTop, 600) : false;
    });
  }
})();

// a[href^='#']

(function AltImage() {
  let post = document.querySelector('.post_inner');
  let postImages = post ? post.querySelectorAll('img') : false;
  if(postImages) {
    postImages.forEach((image) => {
       if (image.alt.length > 10) {
         let desc = document.createElement('p');
         desc.classList.add('thumb_alt');
         desc.textContent = image.alt;
         image.insertAdjacentHTML('afterend', desc.outerHTML);
       }
    });
  }
})();

(function updateDate() {
  var date = new Date();
  var year = date.getFullYear();
  let yearInfo = elem('.year');
  yearInfo ? yearInfo.innerHTML = year : false;
})();

function wrapElement(el, wrap) {
  let wrapper = document.createElement('div');
  pushClass(wrapper, wrap);
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

(function ManageTiles() {
  let tiles = elems('.tile_parent');
  let modal = elem('.tile_host');

  function populateModal(element) {
    modal.appendChild(element);
  }

  function showModal(element) {
    pushClass(modal, 'wrap_min');
    populateModal(element);
    wrapElement(modal, 'modal');
  }
  
  if(tiles) {
    tiles.forEach(function(tile) {
      tile.addEventListener('click', function(event) {
        event.preventDefault();
        let child = this.nextElementSibling;
        showModal(child);
      });
    });
  }

  let tables = elems('table');
  if(tables) {
    tables.forEach(function(table){
      wrapElement(table, 'table_responsive');
    });
  }
})();