const tabs = (key) => {
    let paused = false;
    const block = $(".prices"),
        classes = ["_active", "_opened"],
        action = (value) => {
            const button = block.find('[data-tab="' + value + '"]'),
                table = block.find('[data-table="' + value + '"]');
            if (paused || button.hasClass(classes[0])) return false;
            paused = true;
            button
                .addClass(classes[0])
                .siblings("." + classes[0])
                .removeClass(classes[0]);
            table
                .stop()
                .slideDown(300, function () {
                    $(this).addClass(classes[1]);
                })
                .siblings("." + classes[1])
                .stop()
                .slideUp(300, function () {
                    $(this).removeClass(classes[1]);
                    paused = false;
                });
        };
    block.on("click", "[data-tab]", (e) => {
        action($(e.currentTarget).data("tab"));
    });
    if (key) action(key);
};
tabs();

const scroll = (object) => {
    const action = (target) => {
        target = target.replace('#', '');
        let pos;
        if (!target.length || !$(target).length) pos = 0;
        else {
            let pos = $(target).offset().top - $(".head").outerHeight();
            $("html, body")
                .stop()
                .animate({ scrollTop: pos + "px" }, 300);
        }
    };
    $("[data-scroll]").on("click", (e) => {
        const key = $(e.delegateTarget).attr("href");
        action($(key));
        return false
    });
    if (object) action($(object));
};
scroll();

$("[data-price]").click(function () {
    tabs($(this).data("price"));
    scroll("#prices");
});

  // https://page2page.lohmach.info/index.php5/Заглавная_страница.html