import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { token: String }
  static targets = ["link"];

  initialize() {
    const slug = this.tokenValue
    const iv = window.sessionStorage.getItem('iv_text');
    const key = window.sessionStorage.getItem('key');

    const link = `${window.location.origin}/secrets/${slug}#${iv}secrets${key}`

    this.linkTarget.value = link;
  }
}


