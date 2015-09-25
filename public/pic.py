from PIL import Image
import sys
from time import time

t = time()
img = Image.open(sys.argv[1])
r, g, b = img.split()
print(img.bits, img.format, img.mode, img.size, end='$', sep='$')
r.save('./public/images/red.jpg')
print(time()-t)
