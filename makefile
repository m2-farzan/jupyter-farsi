default:
	alias xetex='xelatex'; jupyter nbconvert --to=pdf --template-file=~/.local/share/jupyter/nbconvert/templates/latex-farsi/index.tex.j2 NOTEBOOK_FILE_NAME.ipynb; unalias xetex
