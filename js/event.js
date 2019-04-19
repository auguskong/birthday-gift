function event(game){
    var gridContainer = $('.grid-container')[0];
    var before;
    on(gridContainer,'click',function(e){
        var target = e.target;
        if (target.tagName !== 'IMG') return;
        var item = target.parentNode.parentNode;
        console.log("item: ", item);
        game.view.itemAction(item);
        if (!before){
            before = item;
            return;
        }
        if (before === item) return; //当前元素已经是被选中状态 -> 不做任何操作
        var beforeIndex = parseInt(before.getAttribute('data-index'));
        var afterIndex = parseInt(item.getAttribute('data-index'));
        var same = game.judge(beforeIndex,afterIndex);
        if (same){
            before = null;
        }else{
            game.view.itemCancelAction(before);
            before = item;
        }
    });

    var restartBtn = $('#restart')[0];
    on(restartBtn, 'click', function (e) {
        game.restart();
    });

}