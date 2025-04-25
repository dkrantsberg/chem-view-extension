# ChemView Chrome Extension

A Chrome extension that allows you to visualize chemical structures from SMILES strings on any webpage.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the directory containing this extension

## Usage

1. Select a SMILES string on any webpage (e.g., `CC(=O)Oc1ccccc1C(=O)O` for aspirin)
2. Right-click the selection
3. Click "Draw Chemical Structure" from the context menu
4. A tooltip will appear showing the molecular structure
5. Click the [×] button to close the tooltip

## Features

- Renders chemical structures from SMILES notation using RDKit.js
- Displays a 250×250px tooltip with the molecular structure
- Easy-to-use context menu integration
- Close button for dismissing the tooltip

## Example SMILES Strings

- Aspirin: `CC(=O)Oc1ccccc1C(=O)O`
- Caffeine: `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`
- Ibuprofen: `CC(C)Cc1ccc(cc1)[C@H](C)C(=O)O` 