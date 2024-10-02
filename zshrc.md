# Personal Zsh configuration file. It is strongly recommended to keep all

# shell customization and configuration (including exported environment

# variables such as PATH) in this file or in files sourced from it.

#

# Documentation: https://github.com/romkatv/zsh4humans/blob/v5/README.md.

# Periodic auto-update on Zsh startup: 'ask' or 'no'.

# You can manually run `z4h update` to update everything.

zstyle ':z4h:' auto-update 'no'

# Ask whether to auto-update this often; has no effect if auto-update is 'no'.

zstyle ':z4h:' auto-update-days '28'

# Keyboard type: 'mac' or 'pc'.

zstyle ':z4h:bindkey' keyboard 'pc'

# Don't start tmux.

zstyle ':z4h:' start-tmux no

# Mark up shell's output with semantic information.

zstyle ':z4h:' term-shell-integration 'yes'

# Right-arrow key accepts one character ('partial-accept') from

# command autosuggestions or the whole thing ('accept')?

zstyle ':z4h:autosuggestions' forward-char 'accept'

# Recursively traverse directories when TAB-completing files.

zstyle ':z4h:fzf-complete' recurse-dirs 'no'

# Enable direnv to automatically source .envrc files.

zstyle ':z4h:direnv' enable 'no'

# Show "loading" and "unloading" notifications from direnv.

zstyle ':z4h:direnv:success' notify 'yes'

# Enable ('yes') or disable ('no') automatic teleportation of z4h over

# SSH when connecting to these hosts.

zstyle ':z4h:ssh:example-hostname1' enable 'yes'
zstyle ':z4h:ssh:\*.example-hostname2' enable 'no'

# The default value if none of the overrides above match the hostname.

zstyle ':z4h:ssh:\*' enable 'no'

# Send these files over to the remote host when connecting over SSH to the

# enabled hosts.

zstyle ':z4h:ssh:\*' send-extra-files '~/.nanorc' '~/.env.zsh'

# Clone additional Git repositories from GitHub.

#

# This doesn't do anything apart from cloning the repository and keeping it

# up-to-date. Cloned files can be used after `z4h init`. This is just an

# example. If you don't plan to use Oh My Zsh, delete this line.

z4h install ohmyzsh/ohmyzsh || return

# Install or update core components (fzf, zsh-autosuggestions, etc.) and

# initialize Zsh. After this point console I/O is unavailable until Zsh

# is fully initialized. Everything that requires user interaction or can

# perform network I/O must be done above. Everything else is best done below.

z4h init || return

# Extend PATH.

path=(~/bin $path)
export PATH="/usr/local/opt/python@3.11/bin:$PATH"

# Export environment variables.

export GPG_TTY=$TTY

# Source additional local files if they exist.

z4h source ~/.env.zsh

# Use additional Git repositories pulled in with `z4h install`.

#

# This is just an example that you should delete. It does nothing useful.

z4h source ohmyzsh/ohmyzsh/lib/diagnostics.zsh # source an individual file
z4h load ohmyzsh/ohmyzsh/plugins/emoji-clock # load a plugin

# Define key bindings.

z4h bindkey z4h-backward-kill-word Ctrl+Backspace Ctrl+H
z4h bindkey z4h-backward-kill-zword Ctrl+Alt+Backspace

z4h bindkey undo Ctrl+/ Shift+Tab # undo the last command line change
z4h bindkey redo Alt+/ # redo the last undone command line change

z4h bindkey z4h-cd-back Alt+Left # cd into the previous directory
z4h bindkey z4h-cd-forward Alt+Right # cd into the next directory
z4h bindkey z4h-cd-up Alt+Up # cd into the parent directory
z4h bindkey z4h-cd-down Alt+Down # cd into a child directory

# Autoload functions.

autoload -Uz zmv

# Define functions and completions.

function md() { [[$# == 1]] && mkdir -p -- "$1" && cd -- "$1" }
compdef \_directories md

# Define named directories: ~w <=> Windows home directory on WSL.

[[-z $z4h_win_home]] || hash -d w=$z4h_win_home

# Define aliases.

alias tree='tree -a -I .git'

# Add flags to existing aliases.

alias ls="${aliases[ls]:-ls} -A"

alias gaa='git add -A'
alias gap='git add -p'
alias gcm='git commit -m'
alias gpum='git push -u origin main'

# Set shell options: http://zsh.sourceforge.net/Doc/Release/Options.html.

setopt glob_dots # no special treatment for file names with a leading dot
setopt no_auto_menu # require an extra TAB press to open the completion menu

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

alias cd...='cd ../..'
alias cd....='cd ../../..'
alias cd.....='cd ../../../..'

clone_template_project() {
local templates_dir="/home/voldemort/Downloads/Code/utility_code/code_template/templates"
local index_ts="/home/voldemort/Downloads/Code/utility_code/code_template/index.ts"
local output_file="/tmp/selected_template.txt"

    if [ ! -f "$index_ts" ]; then
        echo "index.ts not found in the templates directory."
        return 1
    fi

    # Run the TypeScript file using Bun
    bun run "$index_ts"

    # Check if the output file exists and read the selected template
    if [ -f "$output_file" ]; then
        local selected_template=$(cat "$output_file")
        rm "$output_file"  # Clean up the temporary file
    else
        echo "No template selected."
        return 1
    fi

    if [ -z "$selected_template" ]; then
        echo "No template selected."
        return 1
    fi

    local template_path="$templates_dir/$selected_template"
    if [ -f "$template_path" ]; then
        # Source the script instead of executing it
        source "$template_path"
    else
        echo "Selected template not found: $selected_template"
        return 1
    fi

}

alias pbcopy='xclip -selection clipboard'
alias pbpaste='xclip -selection clipboard -o'

# Create an alias for the function

alias code_template='clone_template_project'
alias linkedin_template='bun run /home/voldemort/Downloads/Code/utility_code/linkedin_template/index.ts'
alias zshrc='code ~/.zshrc'
alias python='python3.11'
alias generate_cohort_thread='bun run /home/voldemort/Downloads/Code/utility_code/Threads/cohort/index.ts'

source='/home/voldemort/.cache/zsh4humans/v5/ohmyzsh/ohmyzsh/custom/plugins/you-should-use/you-should-use.plugin.zsh'

plugins=(
git
zsh-you-should-use
)
