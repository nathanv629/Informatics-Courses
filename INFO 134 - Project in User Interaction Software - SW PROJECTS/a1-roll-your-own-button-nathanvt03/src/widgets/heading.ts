// importing local code, code we have written
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
// importing code from SVG.js library
import { Rect, Text, Box } from "../core/ui";
import { IdleDownWidgetState, IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { HoverWidgetState, HoverPressedWidgetState, PressedOutWidgetState, DragWindowState } from "../core/ui";

class Heading extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string = "Heading";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 250;
    private defaultHeight: number = 80;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        /* aria */
        this.role = RoleType.heading;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
        this.backcolor = "white";
    }

    set text(text: string) {
        this._input = text;
        this.update();
    }

    get text(): string {
        return this._input;
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

        // resize container rect to match fontSize
        this._rect.width(box.width);
        this._rect.height(box.height);
    }

    move(x: number, y: number): void {
        if (this._group != null)
            this._group.move(x, y);
        this.update();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._text = this._group.text(this._input);

        this.outerSvg = this._group;
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this._group);
        this.registerEvent(this._rect);
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

    onClick() {
        if (this.state instanceof IdleUpWidgetState) {
            this._text.text("Currently in: IdleUpWidgetState");
        }
        else if (this.state instanceof IdleDownWidgetState) {
            this._text.text("Currently in: IdleDownWidgetState");
        }
        else if (this.state instanceof HoverWidgetState) {
            this._text.text("Currently in: HoverWidgetState");
        }
        else if (this.state instanceof PressedWidgetState) {
            this._text.text("Currently in: PressedWidgetState");
        }
        else if (this.state instanceof HoverPressedWidgetState) {
            this._text.text("Currently in: HoverPressedWidgetState");
        }
        else if (this.state instanceof PressedOutWidgetState) {
            this._text.text("Currently in: PressedOutWidgetState");
        }
        else if (this.state instanceof PressedOutWidgetState) {
            this._text.text("Currently in: PressedOutWidgetState");
        }
        else if (this.state instanceof DragWindowState) {
            this._text.text("Currently in: DragWindowState");
        }
    };

    idleupState(): void { this.onClick(); }
    idledownState(): void { this.onClick(); }
    pressedState(): void { this.onClick(); }
    pressReleaseState(): void { this.onClick(); }
    hoverState(): void { this.onClick(); }
    hoverPressedState(): void { this.onClick(); }
    pressedoutState(): void { this.onClick(); }
    moveState(): void { this.onClick(); }
    keyupState(): void { this.onClick(); }
}

export { Heading }