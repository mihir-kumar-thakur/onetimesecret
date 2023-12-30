import { Controller } from "@hotwired/stimulus";
import AESCrypto from "src/aes_crypto";


export default class extends Controller {
  static values = { message: String }
  static targets = ["message"];

  async decrypt(event) {
    const token = window.location.pathname.split("/secrets/")[1]
    const url_secrets = window.location.hash.split("secrets")
    const iv = url_secrets[0].substring(1)
    const key = url_secrets[1]
    const messageElement = this.messageTarget;

    const imported_key = await AESCrypto.importKey(key)
    const decryptedMessage = await AESCrypto.decrypt(AESCrypto.unpack(this.messageValue), imported_key, AESCrypto.unpack(iv))

    messageElement.value = decryptedMessage;

    const requestOptions = { method: 'POST' };
    fetch(`${token}/burn`, requestOptions)
        .then(response => console.log("Secret message burned!!!!"))

    event.target.textContent = "Secret Burned"
  }
}
