import Base64EncoderDecoder from "src/base64_encoder_decoder"

class AESCrypto {
  static async encrypt(data) {
    const encoded = Base64EncoderDecoder.encode(data)
    const key = await AESCrypto.#generateKey()
    const iv = AESCrypto.#generateIv()

    const cipher = await window.crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv: iv,
    }, key, encoded)

    return {
      cipher,
      iv,
      key
    }
  }

  static async decrypt(cipher, key, iv) {
    const encoded = await window.crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: iv,
    }, key, cipher)

    return Base64EncoderDecoder.decode(encoded)
  }

  static async exportKey(key) {
    const raw_key = await crypto.subtle.exportKey('raw', key);

    return this.pack(raw_key)
  }

  static async importKey(key) {
    const exported_key = this.unpack(key)

    return await crypto.subtle.importKey('raw', exported_key, {
      "name":"AES-GCM"
    }, false, ['encrypt','decrypt']);
  }

  static pack(buffer) {
    return window.btoa(
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    )
  }

  static unpack(packed) {
    const string = window.atob(packed)
    const buffer = new ArrayBuffer(string.length)
    const bufferView = new Uint8Array(buffer)

    for (let i = 0; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i)
    }

    return bufferView
  }

  // private methods

  static #generateIv() {
    return window.crypto.getRandomValues(new Uint8Array(12))
  }

  static async #generateKey() {
    return window.crypto.subtle.generateKey({
      name: 'AES-GCM',
      length: 256,
    }, true, ['encrypt', 'decrypt'])
  }
}

export default AESCrypto