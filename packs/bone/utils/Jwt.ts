import {Buffer} from "../node/buffer";
import {Crypto} from "../node/crypto";


export type JwtSignOptions = {
  header: any,
  payload: any,
  secret: string
}

export type JwtVerifyOptions = {
  token: string,
  secret: string
}

export class Jwt {

  static sign(opts: JwtSignOptions) {
    let header = opts.header;
    let payload = opts.payload;
    let secretOrKey = opts.secret;
    let encodedHeader = this.base64urlEncode(JSON.stringify(header));
    let encodedPayload = this.base64urlEncode(JSON.stringify(payload));
    let securedInput = `${encodedHeader}.${encodedPayload}`;
    let signature = this.HS256(securedInput, secretOrKey);
    return this.base64urlEscape(`${securedInput}.${signature}`);
  }
  static toJson(token: string) {
    let segments = token.split('.');
    if (segments.length != 3) {
      return {};
    }
    let headerSeg = segments[ 0 ];
    let payloadSeg = segments[ 1 ];
    let signatureSeg = segments[ 2 ];
    let header, payload;
    try {
      header = JSON.parse(this.base64urlDecode(headerSeg));
      payload = JSON.parse(this.base64urlDecode(payloadSeg));
    } catch (e) {
      return {}
    }
    return {
      headerSeg, payloadSeg, signatureSeg, header, payload
    }
  }
  static verify(opts: JwtVerifyOptions) {
    let { headerSeg, payloadSeg, signatureSeg, header, payload } = this.toJson(opts.token);
    if (payload.exp * 1000 > Date.now()) {
      return {
        expired: true
      }
    }
    let signingInput = [ headerSeg, payloadSeg ].join('.');
    let signed = this.HS256(signingInput, opts.secret);
    //console.info(this.base64urlEscape(signed))
    //console.info(signatureSeg)
    return {
      verified: this.base64urlEscape(signed) === signatureSeg
    };
  }
  static base64urlDecode(str) {
    return Buffer.from(this.base64urlUnescape(str), 'base64').toString("utf-8");
  }
  static base64urlEncode(str) {
    return this.base64urlEscape(Buffer.from(str).toString('base64'));
  }
  static base64urlUnescape(str) {
    str += new Array(5 - str.length % 4).join('=');
    return str.replace(/-/g, '+').replace(/_/g, '/');
  }
  static base64urlEscape(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  static HS256(str, secret) {
    let hmac = Crypto.createHmac('sha256', secret);
    hmac.update(str);
    return hmac.digest('base64');
  }
}