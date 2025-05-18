from http import server
import os

class CustomHandler(server.SimpleHTTPRequestHandler):
    def do_GET(self):
        strippedPath = self.path[1:len(self.path)]
        if not (os.path.isfile(strippedPath) or os.path.isdir(strippedPath+"/")):
            self.path += ".html"
        super().do_GET()

with server.HTTPServer(('', 8000), CustomHandler) as srvr:
     srvr.serve_forever()
