
`command > /path/to/file 2>&1`
`proccess > /path/to/file 2>&1`, continuous output redirect


To automate proccess output redirect even when restarts the computer.
systemd service `/etc/systemd/system/myprocess.service` with:

```bash 
[Unit]
Description=My Background Process
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/myprocess
StandardOutput=append:/var/log/myprocess.log
StandardError=append:/var/log/myprocess.log
Restart=always
User=myuser
WorkingDirectory=/home/myuser

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable myprocess.service
sudo systemctl start myprocess.service
```