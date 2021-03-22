import { h } from 'preact';
import style from './splitter.css';

const Splitter = ({ className, innerClass, borderSize, children }) => {
  if (!borderSize)
    borderSize = '2px';

  const clipPathCss = (offset='0px') => `clip-path:
    polygon(
      0% 50%,
      calc(1em + ${offset}) 0%,
      calc(100% - (1em + ${offset})) 0%,
      100% 50%,
      calc(100% - (1em + ${offset})) 100%,
      calc(1em + ${offset}) 100%
    );
  `

  const compatibleWebkitPathCss = (offset=undefined) => (
    '-webkit-' + clipPathCss(offset) + clipPathCss(offset)
  )

  return (
    <div class={[style.splitter, className].join(' ')} style={compatibleWebkitPathCss(borderSize) + `padding: ${borderSize} calc(3*${borderSize}/2);`}>
    {console.log(compatibleWebkitPathCss())}
      <div class={[style.splitterInner, innerClass].join(' ')} style={compatibleWebkitPathCss() + `padding: ${borderSize} calc(3*${borderSize}/2);`}>
        {children}
      </div>
    </div>
  )
}

export default Splitter;
