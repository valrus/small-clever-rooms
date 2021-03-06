---
layout: post.html
title: Converting a Module to a Package
summary: Python code organization.
tags: [python, module, package]
---

It's happened often (well, twice) that I've had a Python module that started to get a little too big for its britches: maybe approaching 1000 lines, maybe just including several subclasses which are related but really ought to have their own files. Documentation on the Python packaging system can be a bit daunting. I don't think I need to use `setuptools` or `distutils` or `distribute` because this module is intended only for the use of me and my team. I just want to organize my code better.

Making a module into a package is an easy way to make it possible to split it into different source files which are all available under the same name. In simple cases, you can do it with zero modification to the code that imports the module. As a very basic example: say you have a module in your `PYTHONPATH` named `parts.py` with two classes, `Widget` and `Grommet`. You want these two classes to have their own files, but still import them from `parts`.

First, create a directory named `parts` in the same location and two files named `Widget.py` and `Grommet.py` in it; move the source for each class into the corresponding file. Then create a text file in the `parts` directory named `__init__.py`. Edit `__init__.py` and add the following:

```python
from Widget import Widget
from Grommet import Grommet
```

This makes `Widget` and `Grommet` accessible by using, e.g., `from parts import Widget` or

```python
import parts
parts.Widget
```

just as when the two were both in the `parts.py` file.

If `Widget` and `Grommet` have some shared code, you can put that code in a third file, alongside the files for the two classes, and import it into those files normally. Now if you want to, say, add a subclass to `Widget`, you can do so in `Widget.py` without cluttering up the `Grommet` code.
