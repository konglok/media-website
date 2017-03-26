/**
 * Created by huiyeye on 2016/8/19.
 */
function Iterator(total, fn) {
    this.total = total;
    this.index = 0;
    this.fn = fn;

    this.next = function() {
        if((this.index + 1) >= this.total) {
            this.index = -1; // RESET to ZERO
        }

        ++this.index;
        this.fn && this.fn(this.index);

        return this.index;
    }

    this.back = function() {
        if((this.index - 1) <= -1) {
            this.index = this.total;
        }

        --this.index;
        this.fn && this.fn(this.index);

        return this.index;
    }

    this.go = function(index) {
        if(index < 0 || index > this.total)
            return; // 无效索引

        this.index = index;

        this.fn && this.fn(this.index);

        return index;
    }
}

var itemLength = document.querySelectorAll('.item').length;
var indexStateItems = document.querySelector('.indexState');
indexStateItems.innerHTML = new Array(itemLength + 1).join('<li></li>');
document.querySelector('.indexState li').className = ('selected');

var IT= new Iterator(itemLength, function changeState(index){

    for(var i = 0, j = indexStateItems.children.length; i < j; i++) {
        if((index) == i){
            console.log(i)
            indexStateItems.children[i].className = 'selected';
        } else {
            indexStateItems.children[i].className = '';
        }
    }

    if(index == 1) {
        setRunning('.obj-2-1');
        setRunning('.obj-2-2');
        setRunning('.obj-2-3');
        setRunning('.obj-2-4');
    }
    if(index == 2) {
        setRunning('.obj-3-1');
        setRunning('.obj-3-2');
        setRunning('.obj-3-3');
        setRunning('.obj-3-4');
    }
    if(index == 3) {
        setRunning('.obj-4-1');
        setRunning('.obj-4-3');
        setRunning('.obj-4-4');

        // 百叶窗效果
        if(!window.isLoad_4){
            var ul = document.querySelector('.obj-4-1 ul'),
                arr = ul.children;
            var i = 0;

            setTimeout(function(){
                requestAnimationFrame(function (timestamp) {
                    if(arr[i]){
                        var el = arr[i];
                        setTimeout(function(){
                            el.className = 'show';
                        }, i * 200);
                    };
                    if (i < arr.length) {
                        requestAnimationFrame(arguments.callee);
                    }
                    i++;
                });
            }, 600);

            // 最后完成了放大
            setTimeout(function(){
                arr[3].className = 'show big';
                setTimeout(function(){
                    arr[3].className = 'show bigger';// 消失
                }, 800);
            }, 2000);
            window.isLoad_4 = true;
        }
    }
    if(index == 4) {
        setRunning('.obj-5-1');
        setRunning('.obj-5-2');
        setTimeout(function(){
            document.querySelector('.obj-5-2').className += ' hover';
        }, 1500);
        setRunning('.obj-5-3');
        setRunning('.obj-5-4');
    }
});

function setRunning(el) {
    var el = document.querySelector(el);
    el.style.animationPlayState = el.style.webkitAnimationPlayState = "running";
}
//setInterval('console.log(IT.back())', 1000);

var startTime = 0, //开始翻屏时间
    endTime = 0, now = 0;
function handle(delta) {
    console.log(delta)
}
var h = 0;
// 1秒内执行一次翻页
// http://blog.csdn.net/yinkaihui/article/details/51169916
var isFF = navigator.userAgent.indexOf('Firefox') != -1;
function wheel(event) {
    startTime = new Date().getTime();

    var delta = event.detail || -event.wheelDelta;

    if ((endTime - startTime) < -1000) {
        if (delta > 0) {// 向下翻页
// 					h += window.innerHeight;
// 					console.log(h);
            scrollTo(isFF ? document.documentElement : document.body, IT.next() * window.innerHeight, 300);
        }

        if (delta < 0){//向上翻页
            scrollTo(isFF ? document.documentElement : document.body, IT.back() * window.innerHeight, 300);
// 					document.body.scrollTop -= window.innerHeight;
        }

        endTime = new Date().getTime();
    } else {
        event.preventDefault();
    }
}
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

document.onkeydown = function (e) {
    var event = window.event || e;
// 			console.log(event.keyCode)
// 			return;
    // 左
    if (event.keyCode == 37 || event.keyCode == 38)
        scrollTo(isFF ? document.documentElement : document.body, IT.back() * window.innerHeight, 300);
    // 右
    if (event.keyCode == 39 || event.keyCode == 40)
        scrollTo(isFF ? document.documentElement : document.body, IT.next() * window.innerHeight, 300);
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

