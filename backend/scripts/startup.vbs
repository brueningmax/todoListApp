Set objShell = CreateObject("Wscript.Shell")
objShell.CurrentDirectory = "C:\Users\mail\Desktop\Projects\todo backend"
objShell.Run "npm run start", 0, True