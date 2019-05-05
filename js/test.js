$(function () {

    //функция которая возвращает время игры в формате mm:ss:msmsms
    function updateTime() {
          //получаем количество секунд времени игры, отнимая от текущих секунд начальные на момент старта
          var time_now = Date.now() - start;
          // вычисляем количество минут
          var minute = time_now / (1000*60);
          var absmin = Math.floor(minute);
          var m = absmin > 9 ? absmin : '0' + absmin;
          // вычисляем количество секунд
          var second = time_now / 1000;
          var abssec = Math.floor(second)%60;
          var s = abssec > 9 ? abssec : '0' + abssec;
          // вычисляем милисекунды в формате msmsms
          var msec = time_now % 1000;
          // выводим полученные значения на страницу
          document.getElementById("timer").innerHTML = m + ':' + s + ':' + msec;
          document.getElementById("game_time").innerHTML = m + ':' + s + ':' + msec;
          }

    //основная функция игры
    function game(){

        //обновляем время игры
        clearInterval(timer_out);
        start = Date.now();
        var timer_out = setInterval(updateTime, 1);

        //создаем массив, в котором элементами будут строки для генерации html кода
        //блоков div с id = el1..el8,el11..el18 (ячейки игрового поля)
        var divs = [];
        for (var i = 0; i < 16; i++){
            if(i<8) n = (i % 8)+1;
            else n = (i % 8)+11;
            divs[i] = '<div id=\"el' + n + '\" class=\"item\"></div>';
         }
        // с помощью сортировки перемешиваем элементы в массиве
        // случайным образом
        divs.sort(function(){return (Math.round(Math.random()) - 0.5)});
        // добавляем в div с id='block' html строчки элементов div(ячейки игрового поля)
        var list = document.getElementById('block');
        //очищаем поле от предыдущих блоков
        $('#block').empty();
        //добавляем в поле новые блоки
        for (var i = 0; i < 16; i++) $(divs[i]).appendTo(list);

        // задаем массив для выботки цвета по номеру от 1 до 8
        var colors = ['green', 'red', 'yellow', 'blue', 'orange', 'silver', 'aqua', 'magenta'];
        //переменная для хранения id предыдущего открытого блока
        var prev_block_id = 0;
        //флаг показывает открыт уже один блок или нет
        var flag = 0;
        // result, в которой будут суммироваться правильные варианты ответов
        var result = 0;

        //функция обработки нажатия на ячейку игрового поля
        $('.item').bind('click', function(){
            //считываем id ячейки и по нему определяем цвет
            num_id = parseInt($(this).prop('id').substr(2));
            var num_color = num_id;
            if(num_id > 8) num_color = num_id - 10;
            color = colors[num_color-1];
            //если ни одина ячейка не открыта - открываем и сохраняем ее id
            if(flag == 0){
                $(this).css('background-color', color);
                flag = 1;
                prev_block_id = num_id;
            }
            //если уже одина ячейка открыта сравниваем ее цвет с предыдущей ячейкой
            else{
                //если кликнули на одну ячейку повторно - делаем ее белой(закрываем)
                if(num_id == prev_block_id) $(this).css('background-color', 'white');
                else{
                    // если id ячейки совпадает с предыдущей открытой
                    // увеличиваем результат и обнуляем указатель предыдущей ячейки
                    $(this).css('background-color', color);
                    if((num_color == prev_block_id)||(num_color == prev_block_id-10)){
                        result += 1;
                        prev_block_id = 0;
                    }
                    else{
                        //если id не совпадают окрашиваем обе ячейки в белый(закрываем)
                        function close(){
                            var it = '#el'+num_id;
                            $(it).css('background-color', 'white');
                            var id = '#el'+prev_block_id;
                            $(id).css('background-color', 'white');
                            prev_block_id = 0;
                            }
                         //задержка чтобы можно было увидеть неправильно открытую ячейку
                        setTimeout(close, 200);
                    }
                }
                flag = 0;
                }
            //если открыты все пары цветов - останавливаем таймер и показываем окно с результатом
            if(result == 8){
                clearInterval(timer_out);
                $("#answer_body").show();

            }
        });
    }

    //функция запуска игры по нажатию на кнопку "Старт"
    $('#start').bind('click', function(){
        //запускаем игру
        game();
    });

    //обработчик нажатия ОК на финальной форме
    $('#alert_close').bind('click', function(){
        location.replace("index.html");
    });
} );
