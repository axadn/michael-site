import React from 'react';
import SlideShow from '../slideshow/slideshow';
export default props => <div className = "home-page">
    <SlideShow images={
        ["https://www.collegefashion.net/.image/t_share/MTQ5Mzc5MzY4OTY2MjM1ODMw/hm.png",
        "https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2017/09/14/grid-img/1512949414873440846.jpg"
        ]
        } frequency={3000}/>
</div>;