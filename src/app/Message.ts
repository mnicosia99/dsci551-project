
export class Message {
  _text: string | undefined;

  public setText(value) {
    this._text = value;
  }

  public getText() {
    return this._text;
  }
}
