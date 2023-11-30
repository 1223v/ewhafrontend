export function fullyEncodeURI(str) {
  return encodeURIComponent(str)
    .replace(/-/g, "%2D")
    .replace(/_/g, "%5F")
    .replace(/\./g, "%2E")
    .replace(/!/g, "%21")
    .replace(/~/g, "%7E")
    .replace(/\*/g, "%2A")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
}

export function fullyDecodeURI(str) {
  return decodeURIComponent(
    str
      .replace(/%2D/g, "-")
      .replace(/%5F/g, "_")
      .replace(/%2E/g, ".")
      .replace(/%21/g, "!")
      .replace(/%7E/g, "~")
      .replace(/%2A/g, "*")
      .replace(/%27/g, "'")
      .replace(/%28/g, "(")
      .replace(/%29/g, ")")
  );
}

export function encodeIfNotAlready(encodedStr) {
  try {
    const decodedStr = fullyDecodeURI(encodedStr);

    if (decodedStr === encodedStr) {
      return fullyEncodeURI(encodedStr);
    }
    return encodedStr;
  } catch (e) {
    // 디코딩 오류 발생 시 (예: 잘못된 인코딩) 원본 문자열 인코딩
    return fullyEncodeURI(encodedStr);
  }
}
