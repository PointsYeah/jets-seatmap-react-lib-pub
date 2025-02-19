import React, { useContext, useRef } from 'react';
import { JetsContext } from '../../common';

import './index.css';

const buttonSVG = stroke => `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384.97 384.97" >
<g>
	<g>
		<path fill="${stroke}" d="M360.909,0H24.061C10.767,0,0,10.767,0,24.061v336.848c0,13.293,10.767,24.061,24.061,24.061h336.848
			c13.281,0,24.061-10.767,24.061-24.061V24.061C384.97,10.767,374.191,0,360.909,0z M360.909,360.909H24.061V24.061h336.848
			V360.909z"/>
		<path fill="${stroke}" d="M59.935,240.666c0,6.785,5.883,12.151,12.56,11.97h239.92
			c10.671,0.289,16.602-12.872,8.927-20.476l-120.291-119.1c-4.74-4.692-12.403-4.523-17.191,0L63.664,232.065
			C61.379,234.242,59.935,237.274,59.935,240.666z M192.461,138.589l91.021,90.119H101.427L192.461,138.589z"/>
	</g>
</g>
</svg>
`;

const indicatorSVG = stroke =>
  `<svg width="24px" height="24px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-up</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#ffffff" transform="translate(134.255147, 106.680107)"> <polygon id="arrow-up" points="143.073067 298.639787 143.073067 81.6667733 213.32288 151.916587 243.489707 121.749973 121.739733 2.84217094e-14 0 121.749973 30.1668267 151.916587 100.4064 81.6693333 100.4064 298.639787"> </polygon> </g> </g> </g></svg>`;

export const JetsDeckSelector = ({ direction }) => {
  const { params, colorTheme, switchDeck } = useContext(JetsContext);
  const elementRef = useRef(null);

  const { deckSelectorStrokeColor, deckSelectorFillColor, deckSelectorSize } = colorTheme;

  const style = {
    // transform: `rotate(${180 * Number(direction)}deg)`,
    // background: deckSelectorFillColor,
    height: deckSelectorSize,
    // width: deckSelectorSize,
    left: params?.rightToLeft ? 'auto' : 0,
    right: params?.rightToLeft ? 0 : 'auto',
  };

  const indicatorStyle = {
    transform: `rotate(${180 * Number(direction)}deg)`,
    marginTop: direction ? '-4px' : '4px',
  };
  return (
    <div
      className={`jets-deck-selector`}
      style={style}
      ref={elementRef}
      onClick={e => switchDeck()}
      // dangerouslySetInnerHTML={{
      //   __html: buttonSVG(deckSelectorStrokeColor),
      // }}
    >
      <span>{direction ? 'Lower' : 'Upper'} deck</span>
      <div
        className="indicator"
        style={indicatorStyle}
        dangerouslySetInnerHTML={{
          __html: indicatorSVG(),
        }}
      ></div>
    </div>
  );
};
