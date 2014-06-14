/*=============================================================================
#     FileName: logic.js
#         Desc: 
#       Author: chenjd
#        Email: 609828261@qq.com
#     HomePage: http://www.xiaochen-gamer.com
#      Version: 0.0.1
#   LastChange: 2014-06-13 11:36:25
#      History:
=============================================================================*/
var logic = logic || {};
logic.Mgr = {
    _registedLayer:{},
    _layer:null,//被操作的layer
    _score:0,//本局分数

    register:function(id, obj){
       if(this._registedLayer[id] !== undefined){
           cc.log('@error info ' + id + ' has been registed');
       }else{
           this._registedLayer[id] = obj;
           this._layer = this._registedLayer[id];
       }
    },

    removeLayer:function(id){
       this._score = 0;
       if(this._registedLayer[id] === undefined){
           cc.log('@error info ' + id + ' has not been registed');
       }else{
           this._registedLayer[id] = undefined;
       }
    },

    generate:function(){
            this.number_1_cont = GetRandomNum(1, 10);
            this.number_2_cont = GetRandomNum(1, 10);
            var operator_id = Math.ceil(Math.random()*3) - 1;
            switch(operator_id){
            case 0:
                this.result = this.number_1_cont + this.number_2_cont;
                break;
            case 1:
                this.result = this.number_1_cont - this.number_2_cont;
                break;
            case 2:
                this.result = this.number_1_cont * this.number_2_cont;
                break;
            case 3:
                this.result = this.number_1_cont / this.number_2_cont;
                break;
            }
            var nums = [this.number_1_cont, this.number_2_cont, this.result];
            return nums;
           },

    judge:function(selectID){
        switch(selectID){
            case 1:
                result = this.number_1_cont + this.number_2_cont;
                break;
            case 2:
                result = this.number_1_cont - this.number_2_cont;
                break;
            case 3:
                result = this.number_1_cont * this.number_2_cont;
                break;
            case 4:
                result = this.number_1_cont / this.number_2_cont;
                break;
            case 5:
                result = null;
                break;
        }
        if(result == this.result){
            this._score++;
            this._layer._answered = true;
            cc.log('right');
        }
        else{
            cc.log('wrong');
            var retryBtn = cc.MenuItemImage.create('res/btn_retry.png', 'res/btn_retry.png', function(){
                var scene = new gameScene();
                cc.director.runScene(scene);
            },this);
            var homeBtn = cc.MenuItemImage.create('res/btn_quit.png', 'res/btn_quit.png', function(){
                var scene = new gameScene();
                cc.director.runScene(scene);
            },this);
            homeBtn.setPosition(200, 0);
            var menu = cc.Menu.create(retryBtn, homeBtn);
            menu.setPosition(-100, 0);
            this.gameOver = new cc.Layer();
            this.gameOver.bg = cc.Sprite.create('res/over_bg.png');
            this.gameOver.bg.setPosition(0, 250);
            this.gameOver.addChild(this.gameOver.bg);
            this.gameOver.addChild(menu);
            this.gameOver.setPosition(320, 350);
            this._score > MAX_SCORE?MAX_SCORE = this._score:null;
            var score = cc.LabelTTF.create(this._score, 'Arial', 30);
            score.setPosition(280, 190);
            var maxScore = cc.LabelTTF.create(MAX_SCORE, 'Arial', 30);
            maxScore.setPosition(280, 100);
            this.gameOver.bg.addChild(score);
            this.gameOver.bg.addChild(maxScore);
            this._layer.addChild(this.gameOver);
            cc.director.pause();
        }
          }
};
