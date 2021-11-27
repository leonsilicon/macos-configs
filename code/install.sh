cd ~/code
mkdir -p ~/code/bin

curl -LO https://github.com/neovim/neovim/releases/download/nightly/nvim-macos.tar.gz
tar xzf nvim-macos.tar.gz
rm nvim-macos.tar.gz

rm -rf ~/code/bin/nvim
ln -s ~/code/nvim-osx64/bin/nvim ~/code/bin/nvim 
