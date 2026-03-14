figma.showUI(__html__, { width: 520, height: 720, themeColors: false });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'insert-qr') {
    const svgString = msg.svg;
    const label = msg.label || 'QR Code';

    const node = figma.createNodeFromSvg(svgString);
    node.name = label;
    node.x = figma.viewport.center.x - node.width / 2;
    node.y = figma.viewport.center.y - node.height / 2;

    figma.currentPage.appendChild(node);
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);

    figma.ui.postMessage({ type: 'insert-success' });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
