(function pulse(back) {
$('.cookie').animate(
    {
        width: (back) ? $('.cookie').width() + 20 : $('.cookie').width() - 20
    }, 700);
$('.cookie').animate(
    {
        'font-size': (back) ? '100px' : '140px',
        opacity: (back) ? 1 : 0.5
    }, 700, function(){pulse(!back)});
})(false);
