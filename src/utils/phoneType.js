export function phoneType() {
	const ua = typeof window === "object" ? window.navigator.userAgent : "";
  console.log(ua)
  let type = null;
	if (/iPhone|iPod|iPad/i.test(ua)) {
		type = "IOS";
	} else if (/Android/i.test(ua)) {
		type = "Android";
	}
  return type
}
