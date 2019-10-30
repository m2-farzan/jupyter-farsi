# jupyter-farsi
Workarounds to write/export Jupyter notebooks with Persian text in them

## WHAT YOU'LL GET:

![alt text](https://raw.githubusercontent.com/m2-farzan/jupyter-farsi/master/images/preview.png)

## مقدمه
بسیاری از ما از جوپتیر نوت بوک خوشمان می‌آید اما چون جوپیتر با متن فارسی راست به چپ فارسی خوب کار نمی‌کند، نمی‌توانیم از آن استفاده کنیم.
من تصمیم داشتم برای پروژه‌های درسی‌ام از جوپیتر استفاده کنم و موفق شدم راهکارهایی برای سازگار کردن آن با متن فارسی پیدا کنم.
در این ریپو من این راهکارها را به اشتراک گذاشته‌ام و آپدیت می‌کنم اما امیدوارم به طور همزمان بتوانیم به کمک یکدیگر تغییرات لازم را در کد بالادست جوپیتر اعمال کنیم تا دیگر نیازی به این ریپو نباشد.

مشکلات جوپیتر با متن فارسی دو دسته است:

* به هم ریختگی متن در وب اپ جوپیتر
* به هم ریختگی متن در خروجی لاتکس

شکل زیر به هم ریختکی متن در وب اپ را نشان می‌دهد:

![alt text](https://raw.githubusercontent.com/m2-farzan/jupyter-farsi/master/images/scrumbled_webapp.png)

در این ریپو راه حل این دو مشکل توصیف شده است. راه حل مشکل اول یک کد جاوا اسکریپت است که مشخصات و استایل المان‌های صفحه را طوری تغییر می‌دهد که متن فارسی به درستی نمایش داده شود.
راه حل مشکل دوم تهیه یک قالب لاتکس است که بر پایه زی‌پرشین تعریف شده است و برخی محیط‌های لاتکس را تغییر می‌دهد.

در ادامه نحوه پیاده سازی این راه حل ها آمده است.

## پیش‌نیازها

### Required packages:

* python3 [ubuntu: python3] [archlinux: python]
* jupyter [python3 -m pip install jupyter]
* texlive [ubuntu: texlive-full texlive-lang-arabic] [archlinux: texlive-most texlive-langextra]
* pandoc [ubuntu: pandoc] [archlinux: pandoc-bin (aur)]

### Required checks:
Please verify that you already can:
* create and work on a typical jupyter notebook (open a terminal and command
`jupyter notebook`
or
`python3 -m notebook`)
* export a jupyter notebook to pdf (use menu `File->Download As->Pdf via LaTeX` or command
`jupyter nbconvert --to=pdf my_notebook_file_name.ipynb`)
* create and export a simple Persian latex document (copy the text from the simplest example provided
[here](http://www.parsilatex.com/wiki/%D8%A7%D8%B2_%DA%A9%D8%AC%D8%A7_%D8%B4%D8%B1%D9%88%D8%B9_%DA%A9%D9%86%DB%8C%D9%85%D8%9F)
 into a file name eg. a.tex and command `xelatex a.tex`)
 
If any of above fails, you must solve the error before going on.

## رفع مشکل به هم ریختگی متن نمایش داده شده در اینترفیس وب
برای این کار باید یک کد جاواسکریپت را به عنوان اکستنشن به جوپیتر اضافه کنیم.
برای این کار محتویات این ریپو را در یک محل موقتی دانلود کرده و درون ریپو یک ترمینال باز کنید و دستورات زیر را بزنید:

```
sudo jupyter nbextension install webview-rtl-fix
jupyter nbextension enable webview-rtl-fix/main
```

حال جوپیتر را ببندید و مجدد باز کنید. باید مشکل حل شده باشد.

## رفع مشکل خروجی لاتکس

برای گرفتن خروجی لاتکس، باید قالب را نصب کنید. ابتدا با استفاده از دستور زیر بفهمید که محل نصب قالب‌های جوپیتر-لاتکس کجاست:

`locate base.tplx`

برای من در چنین محلی است:

`/usr/lib/python3.7/site-packages/nbconvert/templates/latex/base.tplx`

بنابراین فایل قالب را به این محل کپی می‌کنیم:

`sudo cp latex-farsi.tplx /usr/lib/python3.7/site-packages/nbconvert/templates/latex/`

حال قالب مورد نظر ما اضافه شده است.
از این پس، کافیست هنگام خروجی گرفتن از نوت بوک مورد نظر، قالب خود را بر گزینیم. متاسفانه این کار با استفاده از منوها ممکن نیست بنابراین باید دستوراتی مانند آنچه در ادامه می‌آید استفاده شوند:

`alias xetex='xelatex'; jupyter nbconvert --to=pdf --template=latex-farsi NOTEBOOK_FILE_NAME.ipynb; unalias xetex`

این آخری خیلی طولانی شد. برای اینکه هر دفعه نخواهیم این دستور را تایپ کنیم، فایل

makefile

موجود در ریپو را در کنار دفتر کپی می‌کنیم تا با زدن دستور 

make

دفتر به پی دی اف تبدیل شود.

فراموش نکنید که اسم دفتر را در 

makefile

تغییر دهید.

همچنین، برای ثبت عنوان، نام نویسنده و به نام خدا، در جوپیتر وارد مسیر زیر شوید:

Edit -> Edit Notebook Metadata

و در آنجا از چیزی مانند آنچه در زیر آمده است استفاده کنید:

```
{
  "author": "اعضای گروه:",
  "benamekhoda": "1",
  "title": "تمرین شماره (۲) CFD"
  }
```
