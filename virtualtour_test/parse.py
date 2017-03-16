#!/usr/bin/python
import xml.etree.ElementTree as ET
from tempfile import mkstemp
from shutil import move
from os import remove, close
import os
import fnmatch
####### To run this script :    ./parse.py
####### You need to change the name of the xml file below
upload_path = '/var/www/html/upload/upload_panos/';
for file in os.listdir(upload_path):
    if fnmatch.fnmatch(file, '*.xml'):
        break

tree = ET.parse(upload_path + file) #Change the name here
vpspace = tree.getroot()
content = []
file_path = "assets/map_temp.js"
dest_path = "script/map_util.js"

for scene in vpspace.findall('scene'):
    info = {}
    info['sceneid'] = scene.find('sceneid').text
    info['panopath'] = scene.find('panopath').text
    info['panopath'] = upload_path + os.path.basename(info['panopath']) 
    info['sx'] = scene.find('sx').text
    info['sy'] = scene.find('sy').text
    content.append(info)

# Create temp file
fh, abs_path = mkstemp()
with open(abs_path, 'w') as new_file:
    with open(file_path) as old_file:
        for line in old_file:
            new_file.write(line)

            if line.startswith('    var mapOptions'):
                new_file.write('        center: {lat: ' + content[0]['sx'] + ', lng:' + content[0]['sy'] + '},\n')

            elif line.startswith('    var myLatLngArray'):
                for info in content:
                    new_file.write('      {lat: ' + info['sx'] + ', lng: ' + info['sy'] + '}, \n')

            elif line.startswith('        icons:'):
                for i in range(len(content)):
                    new_file.write('        {\n')
                    new_file.write('        icon: lineSymbol,\n')
                    new_file.write('        offset: \'' + str(100*(i+1)/(len(content)+1)) + '%\'\n')
                    new_file.write('        },\n')

            elif line.startswith('        switch(index_i)'):
                for i in range(len(content)):
                    new_file.write('        case ' + str(i) + ':\n')
                    new_file.write('        window.location.replace(\'pano' + str(i) + '.html\');\n')
                    new_file.write('        break;\n')

close(fh)
# Move new file
move(abs_path, dest_path)

file_path = "assets/pano_tmp.html"
i = 0
for info in content:
    dest_path = "pano" + str(i) + ".html"
    i += 1
    # Create temp file
    fh, abs_path = mkstemp()
    with open(abs_path, 'w') as new_file:
        with open(file_path) as old_file:
            for line in old_file:
                new_file.write(line)

                if line.startswith('            <!-- Here is the 360'):
                    new_file.write('            <img src=\"' + info['panopath'] + '\"\n')

                elif line.startswith('              id=\"mainpicture\"'):
                    new_file.write('              data-image=\"' + info['panopath'] + '\"\n')

    close(fh)
    move(abs_path, dest_path)
