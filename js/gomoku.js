/**
 * Created by Administrator on 2015/4/2.
 */
var board = document.getElementById("gomoku");
var turn;
var record = [];
var boardWidth=750,
    boardHeight=750,
    marginInit=25,
    gridLength=50,
    row=15,
    column=15,
    radius=20;
var chess = {
    //��������
    init: function () {
        if (board.getContext) {
            record=[];
            turn = 0;
            var context = board.getContext("2d");
            context.clearRect(0,0,boardWidth,boardHeight);
            //������߿�
            context.strokeRect(0, 0, boardWidth, boardHeight);
            context.strokeStyle = "#000";
            //��������
            context.beginPath();
            for (var i = 0; i < column; i++) {
                context.moveTo(marginInit + gridLength * i, 25);
                context.lineTo(marginInit + gridLength * i, 725);
            }
            //���ƺ���
            for (var j = 0; j < row; j++) {
                context.moveTo(25, marginInit + gridLength * j);
                context.lineTo(725, marginInit + gridLength * j);
            }
            context.stroke();
            //��������
        }
    },
    //���ư���
    white: function (clickX, clickY) {
        console.log("clientX: " + clickX + ", clientY: " + clickY);
        var center = this.getCenterXY(clickX, clickY);
        if (this.preventOverride(center.x, center.y)) {
            return false;
        }
        console.log(center);
        var context = board.getContext("2d");
        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fillStyle = "#FFF";
        context.fill();
        //�����¹�Ϊ0������Ϊ1
        turn = 0;
        var step = {
            "x": center.x,
            "y": center.y,
            "turn": turn
        };
        record.push(step);
        console.log(record);
    },
    //���ƺ���
    black: function (clickX, clickY) {
        console.log("clientX: " + clickX + ", clientY: " + clickY);
        var center = this.getCenterXY(clickX, clickY);
        if (this.preventOverride(center.x, center.y)) {
            return false;
        }
        var context = board.getContext("2d");
        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fillStyle = "#000";
        context.fill();
        //�����¹�Ϊ0������Ϊ1
        turn = 1;
        var step = {
            "x": center.x,
            "y": center.y,
            "turn": turn
        };
        record.push(step);
        console.log(record);
    },
    //��ȡԲ������
    getCenterXY: function (clickX, clickY) {
        var center = {};
        //-25ԭ����marginΪ25
        var modX = (clickX - marginInit) % gridLength, modY = (clickY - marginInit) % gridLength;
        if (modX < 25) {
            center.x = clickX - modX;
        } else {
            center.x = clickX - modX + 50;
        }
        if (modY < 25) {
            center.y = clickY - modY;
        } else {
            center.y = clickY - modY + 50;
        }
        return center;
    },
    //���ⱻ�ѻ��Ƶ����ӱ�����
    preventOverride: function (centerX, centerY) {
        var test = {
            "x": centerX,
            "y": centerY
        };
        var length = record.length;
        for (var i = 0; i < length; i++) {
            if (test.x == record[i].x && test.y == record[i].y) {
                console.log("Exsited");
                return true;
            }
        }
        return false;
    },
    //�ж��Ƿ��ʤ
    isWin: function (centerX, centerY,turn) {
        this.isWinHorizon(centerX, centerY,turn);
        this.isWinVertical(centerX, centerY,turn);
        //�ж�45�ȽǷ���
        //�ж�135�ȽǷ���
    },
    //�ж����ҷ���
    isWinHorizon: function (centerX, centerY,turn) {
        var length=record.length;
        var judge=[];
        var judgeHorizon={
            y:centerY,
            turn:turn
        };
        for(var i=0;i<length;i++){
            if(judgeHorizon.y==record[i].y&&judgeHorizon.turn==record[i].turn){
                judge.push(record[i]);
            }
        }
    },
    //�ж����·���
    isWinVertical: function (centerX, centerY, turn) {
        var length=record.length;
        var count;
        for(var i=0;i<length;i++){

        }
    }
};
document.addEventListener("click", function (e) {
    if (e.clientX > boardWidth || e.clientY > boardHeight) {
        //���λ�ó������̱߽�
        return false;
    }
    if (turn == 1) {
        chess.white(e.clientX, e.clientY);
    } else {
        chess.black(e.clientX, e.clientY);
    }
}, false);

chess.init();