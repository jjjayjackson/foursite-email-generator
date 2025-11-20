// script.js – full validation version
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn      = document.getElementById('submit-btn');
  const nameInput      = document.getElementById('name-input');
  const workInput        = document.getElementById('work-order-input');
  const nameError      = document.getElementById('name-error');
  const workError        = document.getElementById('work-error');
  const outputContainer= document.getElementById('output-container');

  // Container + message for the general error under the button
  let generalErrorDiv = document.createElement('div');
  generalErrorDiv.style.color = '#85d0ff';
  generalErrorDiv.style.fontSize = '0.9rem';
  generalErrorDiv.style.marginTop = '0.5rem';
  generalErrorDiv.style.textAlign = 'center';
  generalErrorDiv.textContent = '';
  submitBtn.after(generalErrorDiv);

  // ---------- Validation functions ----------
  const validateName = () => {
    const val = nameInput.value.trim();
    if (val === '') {
      nameError.textContent = 'Name is required';
      return false;
    }
    nameError.textContent = '';
    return true;
  };

  const validateWorkOrder = () => {
    const val = workInput.value.trim();
    const onlyDigits = /^\d{7}$/;   // exactly 7 digits, nothing else

    if (val === '') {
      workError.textContent = 'Work order number is required';
      return false;
    }
    if (!onlyDigits.test(val)) {
      workError.textContent = 'Must be exactly 7 digits (no spaces or other characters).';
      return false;
    }
    workError.textContent = '';
    return true;
  };

  const validateAll = () => validateName() && validateWorkOrder();

  // Real-time validation (optional but nice UX)
  nameInput.addEventListener('input', validateName);
  workInput.addEventListener('input', validateWorkOrder);

  // ---------- Submit handler ----------
  const handleSubmit = (e) => {
    // If coming from Enter key on an input, prevent default form submit
    if (e) e.preventDefault();

    // Clear previous general message
    generalErrorDiv.textContent = '';

    if (!validateAll()) {
      generalErrorDiv.textContent = 'Please check your entries.';
      return;
    }

    // ---- All good → generate the paragraph ----
    const name = nameInput.value.trim();
    const wo   = workInput.value.trim();

    const paragraph = `
Hello Michele,

I have a bed that needs to be picked up. 

Name: ${name}
Department: Emergency; Number: 100
Contact Phone Number: (408) 851 - 1000
Pickup Location: ED Sim Lab
Work Order Number: FKWD${wo}

Thanks, 
${name}`;

    // Clear previous output
    outputContainer.innerHTML = '';

    // Paragraph
    const pre = document.createElement('pre');
    pre.id = 'result';
    pre.textContent = paragraph;
    outputContainer.appendChild(pre);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn';
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(paragraph);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
      } catch (err) {
        alert('Copy failed – please copy manually.');
      }
    });

    // Email button
    const emailBtn = document.createElement('button');
    emailBtn.className = 'btn';
    emailBtn.textContent = 'Email It!';
    emailBtn.addEventListener('click', () => {
      const recipient = 'michele.ross@fourtsiteinc.com';
      const subject   = 'Gurney Work Order';
      const deeplink  = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(paragraph)}`;
      window.open(deeplink, '_blank');
    });

    // Button group
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.appendChild(copyBtn);
    buttonGroup.appendChild(emailBtn);
    outputContainer.appendChild(buttonGroup);
  };

  // Click on Submit button
  submitBtn.addEventListener('click', handleSubmit);

  // Pressing Enter anywhere in the page triggers submit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  });
});