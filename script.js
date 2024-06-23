const lightCheckboxes = document.querySelectorAll('.light-checkboxes input[type="checkbox"]');
const turnOnBtn = document.getElementById('turn-on');
const turnOffBtn = document.getElementById('turn-off');
const sendSignalBtn = document.getElementById('send-signal');

lightCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', toggleControlButtons);
});

turnOnBtn.addEventListener('click', () => {
  const selectedLights = getSelectedLights();
  showPopup(`pins=${selectedLights.join(',')}&states=${selectedLights.map(() => 'HIGH')}`);
});

turnOffBtn.addEventListener('click', () => {
  const selectedLights = getSelectedLights();
  showPopup(`pins=${selectedLights.join(',')}&states=${selectedLights.map(() => 'LOW')}`);
});

sendSignalBtn.addEventListener('click', () => {
  const selectedLights = getSelectedLights();
  const states = selectedLights.map((light) => {
    return document.getElementById(`light${light}`).checked ? 'HIGH' : 'LOW';
  });
  showPopup(`pins=${selectedLights.join(',')}&states=${states.join(',')}`);
});

function toggleControlButtons() {
  const selectedLights = getSelectedLights();
  const hasSelectedLights = selectedLights.length > 0;

  turnOnBtn.disabled = !hasSelectedLights;
  turnOffBtn.disabled = !hasSelectedLights;
  sendSignalBtn.disabled = !hasSelectedLights;
}

function getSelectedLights() {
  return Array.from(lightCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => parseInt(checkbox.value));
}

function showPopup(message) {
  alert(`Message: ${message}`);
}
