# Circle-Scroller (Beta)

This is a module I designed for React. It's [imitating the function of TechCrunch's scroller](https://deetercesler.medium.com/recreating-techcrunchs-checkmark-scroll-tracker-3b863e263aaf).

## Getting Started

Whatever content you have, simply wrap it as a child of `<Scroller>` parent element. E.g....

```
...

<Scroller>
    <div>
    Lorum ipsum dolor est...
    </div>
</Scroller>

...
```

This is ideal for any block of content that is longer where you're trying to increase the percentage of users who actually read it.


### Next iterations

Right now, it's pretty basic. Some ways I'd like to advance it:
- Add `initialGraphic` prop of SVG graphic (instead of blank)
- Add `completeGraphic` prop as alternative for checkmark
- Color options for SVGs
- Color options for the circle line
- Height parameter (implicitly determining the circle's diameter) 
- Some optimizations for performance

If you have ideas, please submit them on [the issues page](https://github.com/DeeterCesler/circle-scroll/issues).

Thanks!