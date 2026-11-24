const container = document.createElement('div');
document.body.appendChild(container);

function updateSelection() {
  const selection = window.getSelection();

  if (!selection.rangeCount || selection.isCollapsed) {
    container.querySelectorAll('.smooth-selection-box').forEach(box => {
      box.style.opacity = '0';
    });
    return;
  }

  const range = selection.getRangeAt(0);
  const rects = Array.from(range.getClientRects());
  const existingBoxes = container.querySelectorAll('.smooth-selection-box');

  rects.forEach((rect, i) => {
    let box = existingBoxes[i];
    if (!box) {
      box = document.createElement('div');
      box.className = 'smooth-selection-box';
      container.appendChild(box);
    }

    box.style.left = `${rect.left + window.scrollX}px`;
    box.style.top = `${rect.top + window.scrollY}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    box.style.opacity = '1';
  });

  for (let i = rects.length; i < existingBoxes.length; i++) {
    existingBoxes[i].style.opacity = '0';
  }
}

document.addEventListener('selectionchange', updateSelection);
window.addEventListener('resize', updateSelection);
