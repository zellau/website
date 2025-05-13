<html>
  <head>
    <link rel="stylesheet" type="text/css" href="crc.css">
  </head>

  <body>
    <?php require($DOCUMENT_ROOT . "header.php") ?>
    <div class="page-info">
      <h2>Software Requirements:</h2>
      <p>Note: software and hardware requirements come automatically with the robot.</p>
      <ul>
        <li>Windows OS</li>
        <li>Kinect for Windows SDK v1.8</li>
        <li>Arduino ide</li>
        <li>Java 1.8</li>
        <li>android adb executable (must be found in C:\Program Files (x86)\Android\android-sdk\platform-tools\adb.exe)</li>
      </ul>
      <h2>Hardware Requirements:</h2>
      <ul>
        <li>Arduino board</li>
        <li>Kinect for Xbox 360</li>
        <li>Cables to connect previously stated to computer via usb port</li>
        <li>Project Tango</li>
      </ul>
      <h2>Turning On Robot:</h2>
      <ol>
        <li>Make sure the Arduino and the Kinect are connected to the NUC and robot is properly charged.</li>
        <li>Flip the switch on the robot.</li>
        <li>Plug the Tango into the robot.</li>
        <li>Open CRC app on the Tango.</li>
        <li>Click the "Set Server IP" button.</li>
        <li>Enter the server and stream IPs.</li>
        If no IPs are entered, defaults will be used.
      </ol>
      <h2>Modes:</h2>
      <p>The robot will remain in standby mode until the server tells it that a user is alone in the lab. Once this happens, the robot will enter enforce mode or remote movement mode, depending on whether a remote user is logged in. The robot will stay on until the server tells it that the user is no longer alone in the lab.</p>
    </div>
    <div class="footer"></div>
  </body>
</html>