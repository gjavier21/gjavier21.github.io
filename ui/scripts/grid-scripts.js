fetch('/ui/data/resonance-legend.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector('.grid');

    data.elements.forEach(el => {
      const tile = document.createElement('div');
      tile.className = 'element';
      tile.style.backgroundColor = el.color;
      tile.setAttribute('data-symbol', el.symbol);
      tile.setAttribute('data-frequency', el.frequency);
      tile.addEventListener('click', () => {
  playTone(parseFloat(tile.getAttribute('data-frequency')), 1);
});

      tile.innerHTML = `
        <span class="symbol">${el.symbol}</span>
        <span class="freq">${el.frequency} Hz</span>
        <span class="role">${el.role}</span>
        <div class="tooltip">${el.notes}. Color: ${el.color}</div>
      `;

      grid.appendChild(tile);
    });

    
    // 🌟 Filter listener goes here, just below .forEach
    document.getElementById('roleFilter').addEventListener('change', function () {
      const selectedRole = this.value;
      document.querySelectorAll('.element').forEach(el => {
        const role = el.querySelector('.role')?.textContent;
        if (!selectedRole || role === selectedRole) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
 // 🎛️ Frequency Slider Filter
const freqSlider = document.getElementById('frequencySlider');
const freqLabel = document.getElementById('freqValue');

freqSlider.addEventListener('input', function () {
  const maxFreq = parseInt(this.value);
  freqLabel.textContent = `Max: ${maxFreq} Hz`;
  document.querySelectorAll('.element').forEach(el => {
    const freq = parseFloat(el.getAttribute('data-frequency'));
    el.style.display = freq <= maxFreq ? 'block' : 'none';
  });
});

// Modal handlers
const modal = document.getElementById('tile-modal');
const modalSymbol = document.getElementById('modalSymbol');
const modalFreq = document.getElementById('modalFreq');
const modalRole = document.getElementById('modalRole');
const modalNotes = document.getElementById('modalNotes');
const closeBtn = document.querySelector('.close-btn');
const copyBtn = document.getElementById('copyURI');
const uriOutput = document.getElementById('uriOutput');
const tagModal = document.getElementById('tag-modal');
const tagInput = document.getElementById('tagInput');
const emotionInput = document.getElementById('emotionInput');
const tagOutput = document.getElementById('tagUriOutput');
const closeTagBtn = document.querySelector('.close-btn-tag');
const genTagBtn = document.getElementById('generateTagURI');

document.querySelectorAll('.element').forEach(tile => {
  tile.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    tagModal.classList.remove('hidden');
    tagModal.setAttribute('data-symbol', tile.getAttribute('data-symbol'));
  });
});

closeTagBtn.addEventListener('click', () => {
  tagModal.classList.add('hidden');
  tagInput.value = '';
  emotionInput.value = '';
});

genTagBtn.addEventListener('click', () => {
  const symbol = tagModal.getAttribute('data-symbol');
  const tag = encodeURIComponent(tagInput.value);
  const emotion = encodeURIComponent(emotionInput.value);
  const uri = `mockmind://tag/${symbol}?semantic=${tag}&tone=${emotion}`;
  tagOutput.textContent = uri;
});

// Trigger modal on tile click
document.querySelectorAll('.element').forEach(tile => {
  tile.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalSymbol.textContent = tile.getAttribute('data-symbol');
    modalFreq.textContent = tile.getAttribute('data-frequency');
    modalRole.textContent = tile.querySelector('.role').textContent;
    modalNotes.textContent = tile.querySelector('.tooltip').textContent;

    const uri = `mockmind://element/${tile.getAttribute('data-symbol')}?role=${encodeURIComponent(modalRole.textContent)}&hz=${modalFreq.textContent}`;
    uriOutput.textContent = uri;
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Copy URI
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(uriOutput.textContent);
  copyBtn.textContent = '✓ Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy URI'), 2000);
});

function playTone(freq, duration = 1) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();

  gainNode.gain.exponentialRampToValueAtTime(
    0.00001,
    context.currentTime + duration
  );

  oscillator.stop(context.currentTime + duration);
}
          
// 🌈 Color Cluster Toggle
document.querySelectorAll('.cluster-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const selected = this.getAttribute('data-color');
    document.querySelectorAll('.element').forEach(el => {
      const bg = el.style.backgroundColor.toLowerCase();
      if (selected === 'all' || bg.includes(selected)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  });
});
