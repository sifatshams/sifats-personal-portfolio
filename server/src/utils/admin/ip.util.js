// get client ip
export const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];

  let ip =
    forwarded?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    req.ip ||
    '';

  // remove ipv6 prefix
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  // convert localhost ipv6
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  return ip;
};
