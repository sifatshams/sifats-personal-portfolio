import { UAParser } from 'ua-parser-js';

import visitorModel from '../models/Visitor.model.js';
import { getGeoLocation } from '../utils/admin/geoLocation.util.js';
import { getClientIp } from '../utils/admin/ip.util.js';

export const trackVisitor = async (req, res, next) => {
  try {
    // ignore admin apis
    if (req.originalUrl.startsWith('/api/admin')) {
      return next();
    }

    // ignore auth apis
    if (req.originalUrl.startsWith('/api/auth')) {
      return next();
    }

    // get client ip
    const ip = getClientIp(req);

    // get user agent
    const userAgent = req.headers['user-agent'] || '';

    // parse user agent
    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser().name || 'Unknown';

    const os = parser.getOS().name || 'Unknown';

    const deviceType = parser.getDevice().type;

    const device =
      deviceType === 'mobile'
        ? 'mobile'
        : deviceType === 'tablet'
          ? 'tablet'
          : 'desktop';

    // get country and city
    const { country, city } = await getGeoLocation(ip);

    // check duplicate visitor within 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const duplicateVisitor = await visitorModel.findOne({
      ip,
      path: req.originalUrl,
      browser,
      device,
      createdAt: {
        $gte: tenMinutesAgo,
      },
    });

    // skip duplicate request
    if (duplicateVisitor) {
      return next();
    }

    // check today's unique visitor
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const uniqueVisitor = await visitorModel.findOne({
      ip,
      createdAt: {
        $gte: today,
      },
    });

    // save visitor
    await visitorModel.create({
      ip,
      browser,
      os,
      device,
      path: req.originalUrl,
      method: req.method,
      referrer: req.get('referer') || null,
      country,
      city,
      userAgent,
      isUnique: !uniqueVisitor,
    });

    next();
  } catch (error) {
    next(error);
  }
};
