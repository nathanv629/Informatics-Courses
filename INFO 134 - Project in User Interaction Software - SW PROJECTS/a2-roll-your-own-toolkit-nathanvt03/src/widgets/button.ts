// importing local code, code we have written
import { Eventobject } from "@svgdotjs/svg.js";
import { IdleDownWidgetState, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box } from "../core/ui";
import { Component } from "../core/ui";
import { HoverWidgetState, HoverPressedWidgetState, PressedOutWidgetState, DragWindowState } from "../core/ui";

class Button extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string = "Control Button";
    private defaultFontSize: number = 50;
    private defaultWidth: number = 250;
    private defaultHeight: number = 80;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size: number) {
        this._fontSize = size;
        this.update();
    }

    private positionText() {
        let box: Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text.x(+this._rect.x() + ((+this._rect.width() / 2)) - (box.width / 2));
        if (this._text_y > 0) {
            this._text.y(this._text_y);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.fill("red");
        this._rect.radius(10);
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);
    }

    override update(): void {
        if (this._text != null)
            this._text.font('size', this._fontSize);
        this._text.text(this._input);
        this.positionText();

        if (this._rect != null)
            this._rect.fill(this.backcolor);

        super.update();
    }

    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(event: any, str = "") {
        if (this.state instanceof IdleUpWidgetState)
            this._rect.fill("red");
        else if (this.state instanceof HoverWidgetState)
            this._rect.fill("blueviolet");
        else if (this.state instanceof PressedWidgetState)
            this._rect.fill("blue");
        else if (this.state instanceof IdleDownWidgetState)
            this._rect.fill("pink");
        else if (this.state instanceof HoverPressedWidgetState)
            this._rect.fill("yellow");
        else if (this.state instanceof PressedOutWidgetState)
            this._rect.fill("orange");
        else if (this.state instanceof DragWindowState)
            this._rect.fill("violet");
    };

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.onClick(this.state);
    }
    idledownState(): void {
        this.onClick(this.state);
    }
    pressedState(): void {
        this.onClick(this.state);
    }
    hoverState(): void {
        this.onClick(this.state);
    }
    hoverPressedState(): void {
        this.onClick(this.state);
    }
    pressedoutState(): void {
        this.onClick(this.state);
    }
    moveState(): void {
        this.onClick(this.state);
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        this.onClick(keyEvent, keyEvent.key);
    }
}

export { Button }