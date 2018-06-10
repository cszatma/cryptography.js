interface String {
  padEnd(targetLength: number, padString?: string): string;
  replaceCharAt(index: number, replacement: string): string;
  removeCharAt(index: number): string;
  hashCode(): number;
}

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0; // floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');

    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
      }

      return String(this) + padString.slice(0, targetLength);
    }
  };
}

if (!String.prototype.replaceCharAt) {
  String.prototype.replaceCharAt = function replaceCharAt(index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };
}

if (!String.prototype.removeCharAt) {
  String.prototype.removeCharAt = function removeCharAt(index) {
    return this.slice(0, index) + this.slice(index + 1);
  };
}

if (!String.prototype.hashCode) {
  String.prototype.hashCode = function hashCode() {
    let hash = 0;

    if (this.length === 0) {
      return hash;
    }

    for (let i = 0; i < this.length; i++) {
      hash = (hash << 5) - hash + this.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  };
}
