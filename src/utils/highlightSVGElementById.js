export function highlightAndClickSVG(id) {
  const el = document.getElementById(id);
  if (!el) {
    alert(`❌ No SVG element with ID '${id}' found.`);
    return;
  }

  // Apply highlight
  el.style.stroke = 'orange';
  el.style.strokeWidth = '4px';
  el.style.fill = '#ffedcc';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Optional click
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}
