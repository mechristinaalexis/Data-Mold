class IPAddress {
  value: string;

  constructor(value: string) {
    if (!IPAddress.isValid(value)) {
      throw new Error("Invalid IP address format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}\d{1,2})|([1-9]?\d))(\.(25[0-5]|(2[0-4]|1{0,1}\d{1,2})|([1-9]?\d))){3})|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}\d{1,2})|([1-9]?\d))(\.(25[0-5]|(2[0-4]|1{0,1}\d{1,2})|([1-9]?\d))){3}))$/;
    return ipv4Regex.test(value) || ipv6Regex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default IPAddress;
