# Quran-Diff-Checker

## Introduction

With the existence of multiple recitations (qira'at) in different areas of the Islamic world, the [differences](https://answering-islam.org/Green/seven.htm) between them have been always a topic of argument for a long time, especially those differences which affect the meaning.

In this experiment I will try to compare Hafs to five other famous recitations (Warsh, Doori, Sosi, Qumbul, Bazzi).



## Methodology

The datasets on which the experiment was done was scrapped from [SurahQuran.com](https://surahquran.com), and was compared once while keeping all *tashkeel* and *harakat*, and once after removing all of them and only keeping the 28 Arabic alphabet letters.

The removing of *tashkeel* was done over two phases:
- Regular Expressions amendments, where various shapes of the same letter was all replaced to a one normalized shape, as well as removing all *tashkeel* unicodes
- [PyArabic](https://pypi.org/project/PyArabic/) library, which provides a set of useful apis for stripping the Arabic words from other noise types

Finally, the comparison was done using [diff-match-patch](https://www.npmjs.com/package/diff-match-patch), which computes all the necessary transformations that should be applied (added, removed, or replaced) to a string in order to match another string. Note that a single word might be counted as multiple differences as it requires multiple transformations.



## Results

| Reference | Compared to | Differences with Tashkeel | Differences without Tashkeel |
|-----------|-------------|:------------------------:|:---------------------------:|
| Hafs      | Warsh       |          121394          |             1017            |
| Hafs      | Doori       |           33599          |             821             |
| Hafs      | Sosi        |           41203          |             777             |
| Hafs      | Qumbul      |           18793          |             812             |
| Hafs      | Bazzi       |           18402          |             804             |


## Disclaimer

This experiment is depending on many variable factors that can cause the results to be less accurate than intended. The experiment's goal is not to count exactly the number of differences, but rather to get a rough estimation on how these recitations (qira'at) differ from each other.

Other studies that was done using different methodologies (eg. not counting differences that does not change the meaning, assuming some similarities between some *harakat*) produced completely different results. Thus, the produced results should be always accompanied with the context of the method it was produced through.
