default:
	alias xetex='xelatex'; jupyter nbconvert --to=pdf --template=latex-farsi NOTEBOOK_FILE_NAME.ipynb; unalias xetex
