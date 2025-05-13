<html>
  <head>
    <link rel="stylesheet" type="text/css" href="crc.css">
  </head>

  <body>
    <?php require($DOCUMENT_ROOT . "header.php") ?>
    <div class="page-info">
    <p>This page plays a video of what the robot is seeing. Please wait a minute for the stream to load.</p>
    <p>If the stream is unavailable, the robot may not be running.</p>
    <div id='wowza_player' style="min-height:360px;"></div>
    <script id='player_embed' src='//player.cloud.wowza.com/hosted/qp4v99fd/wowza.js' type='text/javascript'></script>
    </div>
    <div class="footer"></div>
  </body>
</html>