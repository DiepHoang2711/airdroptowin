function drawRedVectorAreas() {
    var targetElement = document.querySelector(".css-79elbk");
    var rect = targetElement.getBoundingClientRect();
  
    var firstLine = 80;
    var _topStyle = rect.top + firstLine * 1;
    var inner_1 = document.createElement("div");
    inner_1.style.border = "2px solid red";
    inner_1.style.top = `${_topStyle}px`;
    inner_1.style.width = "100%";
    inner_1.style.position = "fixed";
    targetElement.appendChild(inner_1);
  
    _topStyle = rect.top + firstLine * 2.4;
    var inner_2 = document.createElement("div");
    inner_2.style.border = "2px solid red";
    inner_2.style.top = `${_topStyle}px`;
    inner_2.style.width = "100%";
    inner_2.style.position = "fixed";
    targetElement.appendChild(inner_2);
  
    _topStyle = rect.top + firstLine * 4;
    inner_1 = document.createElement("div");
    inner_1.style.border = "2px solid red";
    inner_1.style.top = `${_topStyle}px`;
    inner_1.style.width = "100%";
    inner_1.style.position = "fixed";
    targetElement.appendChild(inner_1);
  }
  
  function handleClick(targetElement, position) {
    const { x, y } = position;
    // Create the Event
    const mdown = new MouseEvent("pointerdown", {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
  
    // Dispatch the Event
    targetElement.dispatchEvent(mdown);
  }
  
  function getRandomPosition(targetElement) {
    // Ensure the element exists
    if (targetElement) {
      // 2. Determine the Position
      // Example: dispatch the event to the center of the element
      var rect = targetElement.getBoundingClientRect();
      var randomX = Math.random() * rect.width;
      var randomY = Math.random() * rect.height;
      var clientX = rect.left + randomX;
      var clientY = rect.top + randomY;
      return {
        x: clientX,
        y: clientY,
      };
    }
  }
  
  const VECTOR = {
    I: {
      x: 390,
      y: 220,
    },
    II: {
      x: 390,
      y: 300,
    },
    III: {
      x: 390,
      y: 420,
    },
    IV: {
      x: 390,
      y: 530,
    },
  };
  
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function handleVectorClick(targetElement, arrayVectors = []) {
    if (arrayVectors.length == 0) {
      return;
    }
  
    var vectors = arrayVectors.map((i) => {
      if (i == 1) {
        return "I";
      }
      if (i == 2) {
        return "II";
      }
      if (i == 3) {
        return "III";
      }
      if (i == 4) {
        return "IV";
      }
    });
  
    for (var i = 0; i < vectors.length; i++) {
      const vectorName = vectors[i];
      const vectorPosition = VECTOR[vectorName];
      handleClick(targetElement, vectorPosition);
  
      await delay(600);
    }
  }
  
  var targetElement = document.querySelector(".css-79elbk");
  function start(targetElement, intervalTime = 5) {
    if (targetElement) {
      const position = getRandomPosition(targetElement);
      handleClick(targetElement, position);
      window.main = setTimeout(() => {
        start(targetElement, intervalTime);
      }, intervalTime);
    }
  }
  
  // start
  start(targetElement);
  
  function stop() {
    if (window.main) {
      clearTimeout(window.main);
    }
  }
  
  //handleVectorClick(targetElement, [1, 3, 2, 4, 4, 3, 2, 1, 4]);
  