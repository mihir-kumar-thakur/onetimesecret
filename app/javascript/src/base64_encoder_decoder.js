class Base64EncoderDecoder {
  static decode(bytestream) {
    const decoder = new TextDecoder()

    return decoder.decode(bytestream)
  }

  static encode(data) {
    const encoder = new TextEncoder()

    return encoder.encode(data)
  }
}

export default Base64EncoderDecoder