const ball = document.querySelector('.ball');
popmotion.animate({
    from: '0px',
    to: '100px',
    repeat: Infinity,
    repeatType: 'mirror',
    type: 'spring',
    onUpdate (update) {
        ball.style.left = update;
        ball.style.top = update;
    }
});

//# sourceMappingURL=Libraries.b75bd955.js.map
