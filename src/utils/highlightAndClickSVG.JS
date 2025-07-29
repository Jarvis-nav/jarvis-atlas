export function highlightAndClickSVG(id) {
  const el = document.getElementById(id);
  if (!el) {
    alert(`❌ Element with ID '${id}' not found in SVG.`);
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  el.style.stroke = 'red';
  el.style.strokeWidth = '4';
  el.style.fillOpacity = '0.5';

  // Simulate click
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}
