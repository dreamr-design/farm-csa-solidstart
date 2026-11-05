import { createHandler, StartServer } from '@solidjs/start/server';

// The document every page renders into. The client scripts SolidStart offers stay out, so a page
// loads no Solid code and every link is a plain page load that runs assets/js/main.js
export default createHandler(() => (
  <StartServer
    document={({ assets, children }) => (
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Courier+Prime:wght@400;700&family=Libre+Franklin:wght@400;600;700;800&family=Stardos+Stencil:wght@700&display=swap" />

<link rel="stylesheet" href="/assets/css/styles.css" />
<script src="/assets/js/main.js" defer></script>
{assets}
</head>
<body>{children}</body>
</html>
    )}
  />
));
