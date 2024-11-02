function downloadAsDOC(text: string, company: string) {
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
          }
        </style>
      </head>
      <body>
        ${text.replace(/\n/g, "<br>")}
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", htmlContent], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${company} - covercraft.doc`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default downloadAsDOC;
