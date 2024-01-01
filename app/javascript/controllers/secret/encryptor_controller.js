import { Controller } from "@hotwired/stimulus";
import AESCrypto from "src/aes_crypto";

export default class extends Controller {
  static targets = ["message", "secret"];

  async encrypt(event) {
    event.preventDefault();

    const form = this.element;
    const secretElement = this.secretTarget;
    const secret_value = secretElement.value;

    if (secret_value !== "") {
      const { cipher, iv, key } = await AESCrypto.encrypt(secret_value);

      const cipher_text = AESCrypto.pack(cipher);
      const iv_text = AESCrypto.pack(iv);
      const exported_key = await AESCrypto.exportKey(key);

      window.sessionStorage.setItem('iv_text', iv_text);
      window.sessionStorage.setItem('key', exported_key);

      // set encrypted text to form
      this.messageTarget.value = cipher_text;
    }

    form.requestSubmit();
  }
}


