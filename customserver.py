from http import server

class CustomHandler(server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if (not (self.path == "/")) and (not ("." in self.path)):
            self.path += ".html"
        print(self.path)
        return super().do_GET()

with server.HTTPServer(('', 8000), CustomHandler) as srvr:
     srvr.serve_forever()
