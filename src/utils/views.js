import numbro from 'numbro';

const views = (views) => {
    if (views > 1000000) {
        return numbro(views).format({ average: true, mantissa: 1 });
    } else if (views > 1000) {
        return numbro(views).format({ average: true, mantissa: 1 });
    } else {
        return views;
    }
}

export default views;

