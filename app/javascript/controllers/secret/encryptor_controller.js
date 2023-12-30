import { Controller } from "@hotwired/stimulus";
import AESCrypto from "src/aes_crypto";

export default class extends Controller {
  static targets = ["message"];

  async encrypt(event) {
    event.preventDefault();

    const form = this.element;
    const messageElement = this.messageTarget;
    const message_value = messageElement.value;

    if (message_value !== "") {
      const { cipher, iv, key } = await AESCrypto.encrypt(message_value);

      const cipher_text = AESCrypto.pack(cipher);
      const iv_text = AESCrypto.pack(iv);
      const exported_key = await AESCrypto.exportKey(key);

      window.sessionStorage.setItem('iv_text', iv_text);
      window.sessionStorage.setItem('key', exported_key);

      messageElement.value = cipher_text;
    }

    form.requestSubmit();
  }
}


