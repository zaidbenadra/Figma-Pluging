figma.showUI(__html__, { width: 360, height: 420 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
    return;
  }

  if (msg.type === 'generate-qr') {
    const { url, size, foreground, background } = msg;

    if (!url || !url.trim()) {
      figma.notify('Please enter a URL');
      return;
    }

    const qrSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="${background}" />
        <rect x="8" y="8" width="24" height="24" fill="${foreground}" />
        <rect x="12" y="12" width="16" height="16" fill="${background}" />
        <rect x="68" y="8" width="24" height="24" fill="${foreground}" />
        <rect x="72" y="12" width="16" height="16" fill="${background}" />
        <rect x="8" y="68" width="24" height="24" fill="${foreground}" />
        <rect x="12" y="72" width="16" height="16" fill="${background}" />

        <rect x="40" y="8" width="8" height="8" fill="${foreground}" />
        <rect x="52" y="8" width="8" height="8" fill="${foreground}" />
        <rect x="40" y="20" width="8" height="8" fill="${foreground}" />
        <rect x="52" y="20" width="8" height="8" fill="${foreground}" />

        <rect x="40" y="40" width="8" height="8" fill="${foreground}" />
        <rect x="48" y="48" width="8" height="8" fill="${foreground}" />
        <rect x="56" y="40" width="8" height="8" fill="${foreground}" />
        <rect x="64" y="48" width="8" height="8" fill="${foreground}" />
        <rect x="40" y="56" width="8" height="8" fill="${foreground}" />
        <rect x="56" y="56" width="8" height="8" fill="${foreground}" />

        <rect x="76" y="40" width="8" height="8" fill="${foreground}" />
        <rect x="76" y="52" width="8" height="8" fill="${foreground}" />
        <rect x="88" y="52" width="4" height="4" fill="${foreground}" />

        <rect x="40" y="76" width="8" height="8" fill="${foreground}" />
        <rect x="52" y="76" width="8" height="8" fill="${foreground}" />
        <rect x="64" y="76" width="8" height="8" fill="${foreground}" />
        <rect x="52" y="88" width="8" height="4" fill="${foreground}" />
      </svg>
    `;

    const qrNode = figma.createNodeFromSvg(qrSvg);
    qrNode.x = figma.viewport.center.x - qrNode.width / 2;
    qrNode.y = figma.viewport.center.y - qrNode.height / 2;
    qrNode.name = `QR Placeholder - ${url}`;

    figma.currentPage.appendChild(qrNode);
    figma.currentPage.selection = [qrNode];
    figma.viewport.scrollAndZoomIntoView([qrNode]);

    figma.notify('QR inserted into canvas');
    figma.closePlugin();
  }
};
