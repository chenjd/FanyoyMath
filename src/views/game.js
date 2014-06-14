/*=============================================================================
#     FileName: game.js
#         Desc: 
#       Author: chenjd
#        Email: 609828261@qq.com
#     HomePage: http://www.xiaochen-gamer.com
#      Version: 0.0.1
#   LastChange: 2014-06-13 10:50:06
#      History:
=============================================================================*/
var MAX_SCORE = 0;
var MUSIC_FILE = 'res/battle1.mp3';
var audioEngine = cc.audioEngine;
audioEngine.playMusic(MUSIC_FILE, true);
var GetRandomNum = function(Max, Min) {
    var Range = Max - Min; 
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
};
var FONTNAME = 'res/Bpreplay.fnt';

var gameLayer = cc.LayerColor.extend({

    ctor:function(){
         this._super();
         this._answered = false;//是否答完的标志位
         this._started = false;//是否开始答题的标志位
    },

    init:function(){
         this._super();
         cc.director.resume();
         this.setColor(cc.color(GetRandomNum(0, 255), GetRandomNum(0, 255), GetRandomNum(0, 255), GetRandomNum(0, 255)));
         var logo = cc.Sprite.create('res/home_logo.png');
         logo.setPosition(320, 700);
         this.addChild(logo);
         //name
         this.name = cc.LabelTTF.create('by @慕容小匹夫', 'Arial', 40);
         this.name.enableStroke(cc.color(0, 0, 0), 2, 1);
         this.name.setPosition(320, 400);
         this.addChild(this.name);
         var beginBtn = cc.MenuItemImage.create('res/btn_play.png', 'res/btn_play.png', function(){
             this.removeAllChildren();
             this._studiolayer = ccs.uiReader.widgetFromJsonFile('res/scene/4operations_ready_1.ExportJson');
             this.loadingBar = ccui.LoadingBar.create();
             this.loadingBar.setScaleX(2);
             this.loadingBar.setPosition(320, 800);
             this.loadingBar.setDirection(ccui.LoadingBar.TYPE_LEFT);
             this.loadingBar.loadTexture('res/blankGauge.png');
             this.addChild(this.loadingBar);
             this.addButton = ccui.helper.seekWidgetByName(this._studiolayer, 'Button_25');
             this.addButton.addTouchEventListener(this.sendAnswer, this);
             this.subButton = ccui.helper.seekWidgetByName(this._studiolayer, 'Button_24');
             this.subButton.addTouchEventListener(this.sendAnswer, this);
             this.multButton = ccui.helper.seekWidgetByName(this._studiolayer, 'Button_23');
             this.multButton.addTouchEventListener(this.sendAnswer, this);
             this.divideButton = ccui.helper.seekWidgetByName(this._studiolayer, 'Button_22');
             this.divideButton.addTouchEventListener(this.sendAnswer, this);
             /*this._studiolayer.setPosition(0, 150);*/
             this.addChild(this._studiolayer);
             this.num1 = cc.LabelBMFont.create('', FONTNAME);
             this.num1.setScale(2.5);
             this.num1.setPosition(220, 600);
             this.num2 = cc.LabelBMFont.create('', FONTNAME);
             this.num2.setScale(2.5);
             this.num2.setPosition(420, 600);
             this.equal = cc.LabelTTF.create('=', 'Arial',120);
             this.equal.setPosition(200, 400);
             this.num3 = cc.LabelBMFont.create('', FONTNAME);
             this.num3.setScale(2.5);
             this.num3.setPosition(320, 400);
             this.addChild(this.num1);
             this.addChild(this.num2);
             this.addChild(this.num3);
             this.addChild(this.equal);
             this.setScene();
         },this);
         var menu = cc.Menu.create(beginBtn);
         menu.setPosition(320, 300);
         this.addChild(menu);
         this.schedule(this.update, 0);
         logic.Mgr.register(1, this);
     },
    update:function(){
         if(this._started){
             this.times < 0?(function(){this.times = 0;logic.Mgr.judge(5)})():this.times -= 1;
             this.loadingBar.setPercent(this.times);
         }
         if(this._answered){
             this.setScene();
         }
     },

    sendAnswer:function(sender, type){
       var act1 = cc.ScaleTo.create(0.1, 1.3);
       var act2 = cc.ScaleTo.create(0.1, 1);
       if(type == ccui.Widget.TOUCH_ENDED){
           switch(sender.getActionTag()){
               case 25:
                   sender.runAction(cc.Sequence.create(act1, act2));
                   logic.Mgr.judge(1);
                   break;
               case 24:
                   sender.runAction(cc.Sequence.create(act1, act2));
                   logic.Mgr.judge(2);
                   break;
               case 23:
                   sender.runAction(cc.Sequence.create(act1, act2));
                   logic.Mgr.judge(3);
                   break;
               case 22:
                   sender.runAction(cc.Sequence.create(act1, act2));
                   logic.Mgr.judge(4);
                   break;
           }
       }
   },

    setScene:function(){
         this.setColor(cc.color(GetRandomNum(0, 255), GetRandomNum(0, 255), GetRandomNum(0, 255), GetRandomNum(0, 255)));
         this.times = 100;
         var num = logic.Mgr.generate();
         this.num1.setString(num[0]);
         this.num2.setString(num[1]);
         this.num3.setString(num[2]);
         this._started = true;
         this._answered = false;
     },

    onExit:function(){
       this._super();
       logic.Mgr.removeLayer(1);
     }

});

var gameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new gameLayer();
        layer.init();
        this.addChild(layer);
    }
});
