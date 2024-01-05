import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/logos/logo_black.svg"></link>
        <link rel="shortcut icon" href="/logos/logo_black.svg" sizes="32x32" type="image/x-icon" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {/* <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css" /> */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Montserrat&family=Urbanist&family=Kanit:wght@300;400;500;600;700" rel="stylesheet" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src="https://kit.fontawesome.com/4a4e1e58b7.js" crossorigin="anonymous"></script> */}
        <script src="https://kit.fontawesome.com/4e881d944d.js" crossorigin="anonymous"></script>
        {/* <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script> */}
        {/* <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script> */}
      </body>
    </Html>
  )
}