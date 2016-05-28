import SimpleHTTPServer
import SocketServer
import time

PORT = 8000
SERIALFILE = "/dev/cu.usbmodem1411"

last_zap = time.time()

class ZapHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(request):
        with open(SERIALFILE, 'wb') as f:
            print "zap!"
            if time.time() - last_zap > 100:
                f.write('\n')
                time.sleep(0.1)
            f.write('\n')

httpd = SocketServer.TCPServer(("", PORT), ZapHandler)

print "serving at port", PORT
httpd.serve_forever()
