import Phaser from 'phaser';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class HelloWorldScene extends Phaser.Scene {
  rexUI: any;
  constructor() {
    super('hello-world');
  }

  preload() {}

  create() {
    var scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 400,
        y: 300,
        width: 350,
        height: 460,

        scrollMode: 0,

        background: this.rexUI.add.roundRectangle(
          0,
          0,
          2,
          2,
          10,
          COLOR_PRIMARY
        ),

        panel: {
          child: createGrid(this, 3, 20),
          mask: {
            mask: true,
            padding: 1,
          },
        },

        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
          // position: 'left'
        },

        mouseWheelScroller: {
          focus: false,
          speed: 0.1,
        },

        header: this.rexUI.add.label({
          height: 30,

          orientation: 0,
          background: this.rexUI.add.roundRectangle(
            0,
            0,
            20,
            20,
            0,
            COLOR_DARK
          ),
          text: this.add.text(0, 0, 'Header'),
        }),

        footer: this.rexUI.add.label({
          height: 30,

          orientation: 0,
          background: this.rexUI.add.roundRectangle(
            0,
            0,
            20,
            20,
            0,
            COLOR_DARK
          ),
          text: this.add.text(0, 0, 'Footer'),
        }),

        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,

          panel: 10,
          header: 10,
          footer: 10,
        },
      })
      .layout();
    //.drawBounds(this.add.graphics(), 0xff0000);

    this.input.topOnly = false;
  }

  update() {}
}
var createGrid = function (scene: any, col: number, row: number) {
  var sizer = scene.rexUI.add.gridSizer({
    column: col,
    row: row,

    columnProportions: 1,
  });
  for (var i = 0; i < col; i++) {
    for (var j = 0; j < row; j++) {
      sizer.add(
        createItem(scene, i, j), // child
        i, // columnIndex
        j, // rowIndex
        'center', // align
        0, // paddingConfig
        true // expand
      );
    }
  }
  return sizer;
};

const Random = Phaser.Math.Between;

var createItem = function (
  this: any,
  scene: {
    rexUI: {
      add: {
        label: (arg0: {
          background: any;
          text: any;
          icon: any;
          space: {
            left: number;
            right: number;
            top: number;
            bottom: number;
            icon: number;
          };
        }) => {
          (): any;
          new (): any;
          setDepth: { (arg0: number): any; new (): any };
        };
        roundRectangle: (
          arg0: number,
          arg1: number,
          arg2: number,
          arg3: number,
          arg4: number,
          arg5: number | undefined
        ) => {
          (): any;
          new (): any;
          setStrokeStyle: {
            (arg0: number, arg1: any, arg2: number): any;
            new (): any;
          };
        };
        press: (arg0: any) => {
          (): any;
          new (): any;
          on: { (arg0: string, arg1: () => void): any; new (): any };
        };
      };
    };
    add: {
      text: (
        arg0: number,
        arg1: number,
        arg2: string,
        arg3: { fontSize: number }
      ) => any;
    };
  },
  colIdx: string | number,
  rowIdx: string | number
) {
  var text = colIdx + ',' + rowIdx;
  var item = scene.rexUI.add
    .label({
      background: scene.rexUI.add
        .roundRectangle(0, 0, 0, 0, 0, undefined)
        .setStrokeStyle(2, COLOR_LIGHT, 1),
      text: scene.add.text(0, 0, text, {
        fontSize: 18,
      }),
      icon: scene.rexUI.add.roundRectangle(
        0,
        0,
        20,
        20,
        10,
        Random(0, 0xffffff)
      ),
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        icon: 10,
      },
    })
    .setDepth(3);
  var press = scene.rexUI.add.press(item).on('pressstart', function () {
    console.log(`press ${text}`);
  });
  return item;
};
