import sys;
import os;
import getpass;

file = open('title', 'r')

print "\033[0;32m"+file.read()+"\033[1;m";

if len(sys.argv) < 2:
	print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
	print "\033[1;41mERROR IN",sys.argv[0]+": MISSING FILE ARGUMENT!\033[1;m";
	print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
for i in sys.argv:
	if not os.path.isfile(i):
		print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
		print "\033[1;41mERROR IN",sys.argv[0],": FILE DOES NOT EXISTS!\033[1;m";
		print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
		sys.exit();
else:
	print "Enter your username/password!";
	usern = raw_input("[\033[0;35mUsername\033[1;m]>>> ");
	passw = getpass.getpass("[\033[0;35mPassword\033[1;m]>>> ");
	print usern, passw;
	for i in sys.argv:
		if os.path.isfile(i):
			if i != sys.argv[0]:
				print "\033[0;32mUploading \033[1;m"+i;
				os.system("curl -s --upload-file "+i+" http://digitalfishfun.com:8124/upload?fname="+i+"\&user="+usern+"\&pass="+passw+" > /dev/null");
		else:
			print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
			print "\033[1;41mERROR IN",sys.argv[0],": FILE DOES NOT EXISTS!\033[1;m";
			print "\033[1;31m@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\033[1;m";
			break;
	print '\033[1;32mUpload Complete!\033[1;m';
