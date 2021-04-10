module.exports = content => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet">
  <title>Overlap - Lettre du président</title>

  <style type="text/css">
    .container {
      max-width: 1000px;
      width: 700px;
      width: 100%;
      border: 5px solid #B11500;
      border-spacing: 0;
      font-size: 20px;
      font-size: 1.5em;
    }

    thead {
      background-color: #B11500;
    }

    thead tr td {
      height: 130px;
    }

    .logo {
      max-height: 130px;
      max-height: 130px;
    }

    .headerlogo {
      width: 100%;
      max-width: 416.68px;
    }

    .letter {
      position: relative;
      text-align: justify;
      font-family: 'Indie Flower', Garamond, cursive;
    }

    .letter .pres {
      width: 200px;
    }

    .letter p {
      font-family: 'Indie Flower', Garamond, cursive;
    }

    .letter td {
      position: relative;
    }

    .letter .stamp {
      display: block !important;
      float: right;
      right: 10px;
      height: 70px;
    }

    .letter .letter2 {
      display: none;
    }

    .socialmedias img {
      margin: 10px;
      width: 70px;
    }
  </style>

</head>
<body style="margin: 0; padding: 0;">
  <table align="center" class="container" cellpadding="0" cellspacing="0" border="0">
    <tbody cellpadding="0" cellspacing="0" border="0">
      <tr cellpadding="0" cellspacing="0" border="0">
        <td cellpadding="0" cellspacing="0" border="0">
          <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr cellpadding="0" cellspacing="0" border="0">
                <td align="center" cellpadding="0" cellspacing="0" border="0">
                  <img class="logo" alt="Overlap Logo" src="https://mail.overlap-bde.fr/portal-left.png" />
                </td cellpadding="0" cellspacing="0" border="0">
                <td align="center" cellpadding="0" cellspacing="0" border="0">
                  <img class="logo headerlogo" alt="Overlap Logo" src="https://mail.overlap-bde.fr/overlap_tintin.png" />
                </td>
                <td align="center" cellpadding="0" cellspacing="0" border="0">
                  <img class="logo" alt="Overlap Logo" src="https://mail.overlap-bde.fr/portal-right.png" />
                </td>
              </tr>
            </thead>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 0;">
          <p style="margin: 0;">
            &nbsp;
          </p>
        </td>
      </tr>
      <tr>
        <td align="center">
          ${content}
        </td>
      </tr>
      <tr>
        <td style="padding: 0;">
          <p style="margin: 0;">
            &nbsp;
          </p>
        </td>
      </tr>
      <tr style="background-color: #B11500;">
        <td class="socialmedias" align="center">
          <p style="margin: 0;">&nbsp;</p>
          <a href="https://www.facebook.com/listebdeoverlap/"><img src="https://mail.overlap-bde.fr/logos/facebook.png" alt="Facebook logo"></a>
          <a href="https://www.instagram.com/listebdeoverlap/"><img src="https://mail.overlap-bde.fr/logos/instagram.png" alt="Instagram logo"></a>
          <a href="https://www.tiktok.com/@listebdeoverlap"><img src="https://mail.overlap-bde.fr/logos/tiktok.png" alt="Tiktok logo"></a>
          <a href="https://discord.gg/gk4acy7C"><img src="https://mail.overlap-bde.fr/logos/discord.png" alt="Discord logo"></a>
          <p style="margin: 0;">&nbsp;</p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`