[core]
    pager = delta
	excludesfile = /home/rutam/.gitignore_global

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true    # use n and N to move between diff sections

    # delta detects terminal colors automatically; set one of these to disable auto-detection
    # dark = true
    # light = true

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default
    
[delta]
    line-numbers = true
[user]
	email = rutambhagat@gmail.com
	name = RutamBhagat
[init]
	defaultBranch = main
