/*  content.js  */

(function () {
    /* Tell Emscripten where the .wasm lives */
    window.Module = {
      locateFile: (path) => chrome.runtime.getURL(path)
    };
  

    let rdkitPromise = null;
    function loadRDKit() {
      if (!rdkitPromise) {
        rdkitPromise = initRDKitModule({
          locateFile: (p) => chrome.runtime.getURL(p)
        });
      }
      return rdkitPromise;
    }
  
    /* Render tooltip */
    function showTooltip(svg, x, y) {
      // remove any existing tooltip
      document.getElementById("chemview-tooltip")?.remove();
  
      const tip = document.createElement("div");
      tip.id = "chemview-tooltip";
      Object.assign(tip.style, {
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: "300px",
        height: "300px",
        background: "#ffffff",
        border: "1px solid #444",
        boxShadow: "0 2px 10px rgba(0,0,0,.3)",
        padding: "4px",
        boxSizing: "border-box",
        zIndex: 2147483647
      });
  
      /* close button */
      const close = document.createElement("button");
      close.textContent = "×";
      Object.assign(close.style, {
        position: "absolute",
        top: "2px",
        right: "4px",
        border: "none",
        background: "transparent",
        fontSize: "18px",
        cursor: "pointer",
        lineHeight: "14px"
      });
      close.onclick = () => tip.remove();
      tip.appendChild(close);
  
      /* molecule SVG */
      const holder = document.createElement("div");
      holder.style.width = "100%";
      holder.style.height = "100%";
      holder.innerHTML = svg;
      tip.appendChild(holder);
  
      document.body.appendChild(tip);
    }
  
    /* Main drawing routine */
    async function drawSmiles(smiles) {
      try {
        if (!smiles) throw new Error("empty selection");
  
        const RDKit = await loadRDKit();
        const mol = RDKit.get_mol(smiles);
        if (!mol) throw new Error("invalid SMILES");
  
        const svg = mol.get_svg();
        mol.delete();
  
        /* position tooltip just below selection */
        let x = 20, y = 20;
        const sel = window.getSelection();
        if (sel && sel.rangeCount) {
          const rect = sel.getRangeAt(0).getBoundingClientRect();
          x = rect.left + window.scrollX;
          y = rect.bottom + window.scrollY + 4;
        }
        showTooltip(svg, x, y);
      } catch (err) {
        console.error("ChemView error:", err);
        alert("ChemView: unable to render that SMILES string.");
      }
    }
  
    /* message bridge from background */
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "chemview:draw") {
        drawSmiles(msg.smiles);
      }
    });
  })();
  