$(function () {
    var divs = [];
    for (var i = 0; i < 16; i++){
        if(i<8) n = (i % 8)+1;
        else n = (i % 8)+11;
        divs[i] = '<div id=\"el' + n + '\" class=\"item\"></div>';
        }

    divs.sort(function(){return (Math.round(Math.random()) - 0.5)});
    for (var i = 0; i < 16; i++){
        var list = document.getElementById('block');
        $(divs[i]).appendTo(list);
        }

    var colors = ['green', 'red', 'yellow', 'blue', 'orange', 'silver', 'aqua', 'magenta'];
    var flag = 0;
    var result = 0;
    var prev_block_id = 0;

    $('.item').bind('click', function(){
        num_id = parseInt($(this).prop('id').substr(2));
        var num_color = num_id;
        if(num_id > 8) num_color = num_id - 10;
        color = colors[num_color-1];

        if(flag == 0){
            $(this).css('background-color', color);
            flag = 1;
            prev_block_id = num_id;
        }
        else{
            $(this).css('background-color', color);
            if((num_color == prev_block_id)||(num_color == prev_block_id-10)){
                result += 1;
                console.log(result);
                prev_block_id = 0;
            }
            else{
                $(this).css('background-color', 'white');
                var id = '#el'+prev_block_id;
                $(id).css('background-color', 'white');
                prev_block_id = 0;
            }
            flag = 0;
            }

    });
    $('<button id="start" value="Старт"></button>').appendTo(list);

} );