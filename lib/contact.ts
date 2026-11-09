export const WHATSAPP_DISPLAY = "+256 708 560 108";
export const WHATSAPP_E164 = "+256708560108";
export const WHATSAPP_DIGITS = "256708560108";

export const whatsappUrl = (message = "Hello CheetahNet, I'd like to check fibre availability at my location.") =>
  `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
