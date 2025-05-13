<html>
  <head>
    <link rel="stylesheet" type="text/css" href="crc.css">
  </head>

  <body>
    <?php require($DOCUMENT_ROOT . "header.php") ?>
    <div class="page-info">
      <!-- tutorial goes here -->
                <h2>Software Requirements:</h2>
                <ul>
                        <li>Java 1.8</li>
                        <li>VLC Media Player</li>
                </ul>

                <h2>Using the software</h2>
                        <ol>
                                <li>Double-click the software to launch it.</li>
                                <li>The configuration file should already have the correct address.  The software will prompt you for your username and password.</li>
                                <li>The buttons are as follows:
                                        <ul>
                                                <li>Disconnect will close your connection.</li>
                                                <li>Reconnect will open a new connection and prompt you for an ip address.</li>
                                                <li>Login will open a new session and ask you for new credentials.</li>
                                                <li>Reload Video will reopen the video stream and prompt you for a new location</li>
                                                <li>Move Robot will allow you to control the robot, if nobody else has control.</li>
                                        <ul>
                                </li>
                        </ol>
                <h2>Controlling the Robot</h2>
                <p>When you gain control of the robot, an additional window will appear.  This window displays a radar image of what the robot sees.  Clicking on this map will cause the robot to enter 'follow mode'.  In follow mode, the robot will follow the closest person to it until it loses its lock. Clicking in the text box will allow you to control the robot with the arrow keys.  Closing this window will release control of the robot.</p>
    </div>
    <div class="footer"></div>
  </body>
</html>
