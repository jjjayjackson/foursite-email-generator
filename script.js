// script.js
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn   = document.getElementById('submit-btn');
  const nameInput   = document.getElementById('name-input');
  const woInput     = document.getElementById('work-order-input');
  const container   = document.getElementById('output-container');

  // ---- 2. NEW: Listen for "Enter" on the whole document ----
document.addEventListener('keydown', (e) => {
  // Only react to the Enter key
  if (e.key !== 'Enter') return;

  submitBtn.click();          // <-- re-uses your existing handler
});

  submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim() || '__________';
    const wo   = woInput.value.trim()   || '__________';

    const paragraph = `
    Hello Michele,

    I have a bed that needs to be picked up. 

    Name: ${name}
    Department: Emergency; Number: 100
    Contact Phone Number: (408) 851 - 1000
    Pickup Location: ED Sim Lab
    Work Order Number: FKWD${wo}

    Thanks, 
    ${name}`;  // ← NEW: Closing + name

    // Clear any previous result
    container.innerHTML = '';

    // ---- Paragraph ----
    const pre = document.createElement('pre');
    pre.id = 'result';
    pre.textContent = paragraph;
    container.appendChild(pre);

    // ---- Copy button ----
    const copyBtn = document.createElement('button');
    copyBtn.id = 'copy-btn';
    copyBtn.className = 'btn'; 
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(paragraph);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
      } catch (err) {
        alert('Copy failed. You might need to manually copy-paste on your device.');
      }
    });

    // ---- Email It! button ----
    const emailBtn = document.createElement('button');
    emailBtn.className = 'btn';
    emailBtn.textContent = 'Email It!';
    emailBtn.addEventListener('click', () => {
    const recipient = 'michele.ross@fourtsiteinc.com';  // Change this!
    const subject = 'Gurney Work Order';

    // This is the magic line
    const deeplink = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(paragraph)}`;

    // Open in a new tab (so your tool stays open)
    window.open(deeplink, '_blank');
    });

    // ---- Button Group (horizontal on large screens, stacked on mobile) ----
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.appendChild(copyBtn);
    buttonGroup.appendChild(emailBtn);
    container.appendChild(buttonGroup);
  });

});