<html>
  <head>
    <link rel="stylesheet" type="text/css" href="crc.css">
  </head>

  <body>
    <?php require($DOCUMENT_ROOT . "header.php") ?>
    <div class="page-info">
    <img src="crc-render.png" alt="CRC robot" width=30% >
    <div style="display:inline-block; float:right; width:65%;">
    <h2>Problem</h2>
    <p>The Utah Nanofab Cleanroom is open 24/7 and it is unsafe for someone to be i\
n the lab alone due to hazardous materials. Researchers often have projects that re\
quire them to be in the lab during off hours. This poses a challenge for lab direct\
ors to maintain a safe environment in the lab at all hours of operation.</p>
    <h2>Solution</h2>
    <p>We have created a remote companion robot and accompanying system which allow\
s autonomous human tracking, live remote video communication, and a cleanroom frien\
dly design. This allows researchers to use a telepresent buddy system where a user \
can remotely watch their friend from home, without needing to drive all the way acr\
oss town.</p>
    </div>
    <div style="float: left; display:inline-block; width:78%;">
    <h2>System</h2>
    <p>Our system is made up of four parts:</p>
    <ul>
      <li>Robot: The internals of the robot. Allow human tracking and robot movemen\
t.</li>
      <li>Project Tango: The user interface on the robot. Streams video and control\
s network connection from the robot.</li>
      <li>Central Server: Facilitates communication between the robot and the clien\
t. Authorizes access and logs activity.</li>
      <li>Client Application: What the remote buddy sees on his computer screen. Al\
lows for communication, robot control, and remote viewing.</li>
    </ul>
    <p>These components work together to allow the lab occupant and the remote budd\
y to communicate. The remote user can see what is happening in the lab and is avail\
able to give feedback, and even call for help should disaster strike.</p>
    </div>
    <img src="system-architecture.png" alt="System architecture" width=20%>
    </div>
    <div class="footer" style="background-color:#BEADA4;">
      <img src="USTAR-Logo-Alt.png" alt="USTAR Logo" width=12%>
      <br/>
      <img src="utahnanofab_2.png" alt="Nanofab Logo" width=15%>
    </div>
  </body>
</html>
