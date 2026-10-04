(() => {
  const pattern = /π\*₀\.₆|π₀\.₇|π₀\.₆|π₀\.₅|π₀/g;
  const blocked = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'SVG', 'MATH']);

  function modelParts(token) {
    if (token === 'π*₀.₆') return ['π*', '0.6'];
    if (token === 'π₀.₇') return ['π', '0.7'];
    if (token === 'π₀.₆') return ['π', '0.6'];
    if (token === 'π₀.₅') return ['π', '0.5'];
    return ['π', '0'];
  }

  function replaceTextNode(node) {
    const text = node.nodeValue;
    if (!text || !pattern.test(text)) {
      pattern.lastIndex = 0;
      return;
    }
    pattern.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      const [base, subscript] = modelParts(match[0]);
      const span = document.createElement('span');
      span.className = 'pi-model-name';
      span.appendChild(document.createTextNode(base));
      const sub = document.createElement('sub');
      sub.textContent = subscript;
      span.appendChild(sub);
      fragment.appendChild(span);

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  }

  function normalize(root) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (parent && !blocked.has(parent.tagName) && !parent.closest('.pi-model-name')) {
        replaceTextNode(root);
      }
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && blocked.has(root.tagName)) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || blocked.has(parent.tagName) || parent.closest('.pi-model-name')) return NodeFilter.FILTER_REJECT;
        return pattern.test(node.nodeValue || '') ? (pattern.lastIndex = 0, NodeFilter.FILTER_ACCEPT) : (pattern.lastIndex = 0, NodeFilter.FILTER_REJECT);
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);
  }

  function init() {
    normalize(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(normalize);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
