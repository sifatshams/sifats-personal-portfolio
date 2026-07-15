import axios from 'axios';

export const getGeoLocation = async (ip) => {
  try {
    // localhost
    if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.')) {
      return {
        country: 'Local',
        city: 'Development',
      };
    }

    const { data } = await axios.get(`https://ipwho.is/${ip}`);

    return {
      country: data.country || 'Unknown',
      city: data.city || 'Unknown',
    };
  } catch (error) {
    return {
      country: 'Unknown',
      city: 'Unknown',
    };
  }
};
