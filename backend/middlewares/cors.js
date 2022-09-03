// const allowedCors = [
//   'http://mesto.evsikova.nomoredomains.sbs',
//   'https://mesto.evsikova.nomoredomains.sbs',
//   'http://localhost:3000',
// ];

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// module.exports.CORS = (req, res, next) => {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   const { method } = req;

//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.status(200).send();
//   }

//   return next();
// };
