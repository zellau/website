<html>
  <head>
    <link rel="stylesheet" type="text/css" href="crc.css">
  </head>

  <body>
    <?php require($DOCUMENT_ROOT . "header.php") ?>
    <div class="page-info">
    <h2>Platform:</h2>
    <p>Any Java-capable, internet-connected computer. Has been tested on OSX and Windows 7 and 10, should run on Linux as well.</p>
    <h2>Requirements:</h2>
    <ul>
    <li>JRE 1.8 is required to be installed on your system.</li>
    <li>Certain ports must be unblocked by the system and network firewalls. Defaults are 2252 for traffic to Tango app and 2256 for traffic to Client application(s).</li>
    These can be changed (see below).
    <li>Additional libraries for SQL queries and under-the-hood web queries to lab sites are already packaged.</li>
    </ul>
    <h2>To Run:</h2>
    <ol>
      <li>Open a command prompt and navigate to the directory containing the JAR file.</li>
      <li>Enter the following without quotes, replacing 'RobotServer.jar' with a custom file name if applicable:  "java -jar RobotServer.jar"</li>
      <li>Press Enter.</li>
    </ol>
    <p>The server is meant to run indefinitely. To terminate the process, type 'quit', press enter, then type 'y' or 'yes' and press enter again.</p>
    <h2>To Configure Ports:</h2>
    <p>Amend the attached ServerConfig.config file by replacing port numbers with the desired ports. Place this file in the same directory as the runnable JAR file, and it will be read from on launch.</p>
    <p>If no configuration file is included, default ports (listed in Requirements, 2252 and 2256) will be used.</p>
    <h2>Logs:</h2>
    <p>Logs will be placed in a directory called "Admin Server Logs" placed where the JAR is executed.</p>
    </div>
    <div class="footer"></div>
  </body>
</html>