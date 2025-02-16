export default function () {
    if (PROD) {
      const logo = `
      
  __________________________________________________
  
       __                          _______  _______ 
      |  |--..---.-..-----..-----.|   |   ||_     _|
      |     ||  _  ||     ||  _  ||   |   | _|   |_ 
      |__|__||___._||__|__||___  ||_______||_______|
                           |_____|                                                 
  ____________________________________________________________________________________
                                 author:Hang
  `;
  
      const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;
  
      console.info(`%c${logo}`, rainbowGradient);
    } else if (DEV) {
      console.log("[HangUI]:dev mode...");
    }
  }